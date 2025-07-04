import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";

import styles from './Header.module.css';

function Header() {
    const { name, logout, accessToken, isTokenExpired, role } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        if (role !== 'USER') navigate('/login');
    };

    const getRoleArea = () => {
        if (role === 'EMPLOYEE') return "Funcionário";
        if (role === 'ADMIN') return "Administrador";
        return null;
    };

    return (
        <Navbar bg={role === 'EMPLOYEE' || role === 'ADMIN' ? "dark" : "primary"} variant="dark" expand="md" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    SESI Lanches{' '}
                    {getRoleArea() && <small className="d-block" style={{ fontSize: "0.8rem", fontWeight: "normal" }}>Área do {getRoleArea()}</small>}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar-nav" />
                <Navbar.Collapse id="main-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            {role !== 'EMPLOYEE' && role !== 'ADMIN' ? 'Cardápio' : 'Início'}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/pedido">
                            {role !== 'EMPLOYEE' && role !== 'ADMIN' ? 'Pedido' : 'Pedidos'}
                        </Nav.Link>
                        {!isTokenExpired(accessToken) && role === 'USER' && (
                            <Nav.Link as={Link} to="/historico">Histórico</Nav.Link>
                        )}
                        {!isTokenExpired(accessToken) && role === 'EMPLOYEE' && (
                            <Nav.Link as={Link} to="/controle">Controle</Nav.Link>
                        )}
                        {!isTokenExpired(accessToken) && role === 'ADMIN' && (
                            <Nav.Link as={Link} to="/controle">Gestão</Nav.Link>
                        )}
                    </Nav>

                    <Nav>
                        {!isTokenExpired(accessToken) ? (
                            <>
                                <div id={styles.nav_dropdown}>
                                    <NavDropdown
                                        title={
                                            <span>
                                                <FaUserCircle />
                                                <strong style={{ margin: '0 10px 0 8px' }}>
                                                    {name?.toUpperCase()}
                                                </strong>
                                            </span>
                                        }
                                        align="end"
                                    >
                                        <NavDropdown.Item as={Link} to="/perfil">Meu perfil</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </div>

                                <Nav.Link
                                    as={Link}
                                    to="/perfil"
                                    className="d-md-none nav-user-option"
                                >
                                    Meu perfil
                                </Nav.Link>
                                <Nav.Link
                                    onClick={handleLogout}
                                    className="d-md-none nav-user-option"
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Faça login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
