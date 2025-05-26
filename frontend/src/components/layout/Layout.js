import { Outlet } from "react-router-dom";

import Navbar from "./Header";
import Footer from './Footer';
import ProtectedRoute from "./ProtectedRoute";

function Layout() {
    return (
        <ProtectedRoute>
            <Navbar />
            <Outlet />
            <Footer />
        </ProtectedRoute>
    )
}

export default Layout;