import api from './api';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useAxiosInterceptors = () => {
    const { token, logout } = useAuth();

    useEffect(() => {

        // request
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                const isAuthRoute = config.url.includes('/auth/');
                if (token && !isAuthRoute) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                return config;
            }, (error) => {
                return Promise.reject(error);
            }
        );

        // response
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        }
    }, [logout, token])
}