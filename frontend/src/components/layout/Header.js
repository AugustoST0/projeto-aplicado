import styles from './Header.module.css';
import Dropdown from 'react-bootstrap/Dropdown';

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { FaUserCircle } from "react-icons/fa";

import Container from './Container';

function Header() {

    const { name, logout } = useAuth();

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
                            <Dropdown.Item as={Link} to="/produtos">Cardápio</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/pedido">Pedido</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/contato">Contato</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/perfil">Meu perfil</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/historico">Histórico de pedidos</Dropdown.Item>
                            <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <ul className={styles.nav_links}>
                        <li><Link to="/produtos">Cardápio</Link></li>
                        <li><Link to="/pedido">Pedido</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                    </ul>
                    <Dropdown>
                        <Dropdown.Toggle as="div" className={styles.user_content} variant="success" id="dropdown-basic">
                            <FaUserCircle />
                            <span>{name.toUpperCase()}</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/perfil">Meu perfil</Dropdown.Item>
                            <Dropdown.Item as={Link} to="/historico">Histórico de pedidos</Dropdown.Item>
                            <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </Container>
    )
}

export default Header;