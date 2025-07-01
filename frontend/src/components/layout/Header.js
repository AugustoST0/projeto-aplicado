import styles from './Header.module.css';
import Dropdown from 'react-bootstrap/Dropdown';

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { FaUserCircle } from "react-icons/fa";

import Container from './Container';

function Header() {

    const { name, logout, isAuthenticated } = useAuth();

    return (
        <Container customClass="header_container">
            <div className={styles.header_content}>
                <div className={styles.logo}>SESI Lanches</div>
                <div className={styles.nav}>
                    <Dropdown>
                        <Dropdown.Toggle as="div" className={styles.menu_toggle} variant="success" id="dropdown-basic">
                            ☰
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/">Cardápio</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/pedido">Pedido</Dropdown.Item>
                            {isAuthenticated ? (
                                <>
                                    <Dropdown.Item as={Link} to="/perfil">Meu perfil</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/historico">Histórico de pedidos</Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                </>
                            ) : (
                                <Dropdown.Item as={Link} to="/login">Faça login</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <ul className={styles.nav_links}>
                        <li><Link to="/">Cardápio</Link></li>
                        <li><Link to="/pedido">Pedido</Link></li>
                        {isAuthenticated ? (
                            <li>
                                <Dropdown>
                                    <Dropdown.Toggle as="div" className={styles.user_content} variant="success" id="dropdown-basic">
                                        <FaUserCircle />
                                        <span>{name && name.toUpperCase()}</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/perfil">Meu perfil</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/historico">Histórico de pedidos</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        ) : (
                            <li><Link to='/login'>Faça login</Link></li>
                        )}
                    </ul>
                </div>
            </div>
        </Container>
    )
}

export default Header;