import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return <Outlet />;
}

export default ProtectedRoute;