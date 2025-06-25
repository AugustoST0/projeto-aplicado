import api from './api';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useAxiosInterceptors = () => {
    const { accessToken, refreshToken, refresh, logout } = useAuth();

    useEffect(() => {
        let isRefreshing = false;
        let failedQueue = [];

        const processQueue = (error, token = null) => {
            failedQueue.forEach(prom => {
                if (error) {
                    prom.reject(error);
                } else {
                    prom.resolve(token);
                }
            });
            failedQueue = [];
        };

        // request
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const isAuthRoute = config.url.includes('/auth/');
                if (accessToken && !isAuthRoute) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => {
                return Promise.reject(error);
            }
        );

        // response
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        })
                            .then((newToken) => {
                                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                                return api(originalRequest);
                            })
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    try {
                        const { accessToken: newAccessToken } = await refresh();
                        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                        processQueue(null, newAccessToken);

                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return api(originalRequest);
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        logout();
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        }
    }, [accessToken, refreshToken, refresh, logout])
}