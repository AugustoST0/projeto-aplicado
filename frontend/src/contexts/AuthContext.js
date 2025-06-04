import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [role, setRole] = useState(() => token ? jwtDecode(token).role : null);
    const [name, setName] = useState(() => token ? jwtDecode(token).name : null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
                setName(decoded.name);
            } catch (e) {
                console.error('Token inválido', e);
                setRole(null);
                setName(null);
            }
        } else {
            setRole(null);
            setName(null);
        }
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
        navigate('/');
    };

    const logout = () => {
        setToken(null);
        localStorage.clear();
        navigate('/login');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, role, name, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);