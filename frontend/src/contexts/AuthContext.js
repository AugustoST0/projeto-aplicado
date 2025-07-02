import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));

    const [name, setName] = useState(() => accessToken ? jwtDecode(accessToken).name : '');
    const [email, setEmail] = useState(() => accessToken ? jwtDecode(accessToken).email : '');
    const [role, setRole] = useState(() => accessToken ? jwtDecode(accessToken).role : '');

    useEffect(() => {
        if (accessToken) {
            try {
                const decoded = jwtDecode(accessToken);
                setName(decoded.name);
                setEmail(decoded.email);
                setRole(decoded.role);
            } catch (e) {
                console.error('Token inválido', e);
                clearSession();
            }
        } else {
            clearSession();
        }
    }, [accessToken]);

    const clearSession = () => {
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setName('');
        setEmail('');
        setRole('');
    };


    const login = ({ accessToken, refreshToken }, shouldRedirect = true) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        if (shouldRedirect) navigate('/');
    };

    const logout = () => {
        clearSession();
        navigate('/login');
    };
    const refresh = () => {
        if (!refreshToken) return logout();

        return api.post('/api/v1/auth/refresh', null, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        })
            .then(res => {
                setAccessToken(res.data.accessToken);
                localStorage.setItem('accessToken', res.data.accessToken);
                return res.data.accessToken;
            })
            .catch(err => {
                console.error('Erro ao renovar token:', err);
                logout();
            });
    };

    const isTokenExpired = (token) => {
        try {
            const { exp } = jwtDecode(token);
            return Date.now() >= exp * 1000;
        } catch (e) {
            return true;
        }
    };

    const isAuthenticated = isTokenExpired();

    const isTokenNearExpiration = (token, seconds = 60) => {
        try {
            const { exp } = jwtDecode(token);
            const now = Date.now();
            const expirationTime = exp * 1000;
            return expirationTime - now <= seconds * 1000;
        } catch (e) {
            return true;
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, name, email, role, login, logout, refresh, isAuthenticated, isTokenExpired, isTokenNearExpiration }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
