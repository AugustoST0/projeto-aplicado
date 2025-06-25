import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));

    const [name, setName] = useState(() => accessToken ? jwtDecode(accessToken).name : null);
    const [email, setEmail] = useState(() => accessToken ? jwtDecode(accessToken).email : null);
    const [role, setRole] = useState(() => accessToken ? jwtDecode(accessToken).role : null);

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
        localStorage.clear();
        setName(null);
        setEmail(null);
        setRole(null);
    };

    const login = ({ accessToken, refreshToken }) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/');
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

    const isAuthenticated = !!accessToken;

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, name, email, role, login, logout, refresh, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
