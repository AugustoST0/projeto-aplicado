import styles from './Header.module.css';
import Dropdown from 'react-bootstrap/Dropdown';

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import { FaUserCircle } from "react-icons/fa";

import Container from './Container';

function Header() {

    const { name, logout, accessToken, isTokenExpired, role } = useAuth();

    return (
        <>
            <Container customClass={role === 'USER' ? 'header_container' : 'nonuser_header'}>
                <div className={styles.header_content}>
                    <div className={styles.logo}>
                        SESI Lanches
                        {role !== 'USER' &&
                            <span>Área do {role === 'EMPLOYEE' ?
                                <span>Funcionário</span> :
                                <span>Administrador</span>}
                            </span>
                        }
                    </div>
                    <div className={styles.nav}>
                        <Dropdown>
                            <Dropdown.Toggle as="div" className={styles.menu_toggle} variant="success" id="dropdown-basic">
                                ☰
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/">
                                    {role === 'USER' ? <>Cardápio</> : <>Início</>}
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/pedido">
                                    {role === 'USER' ? <>Pedido</> : <>Pedidos</>}
                                </Dropdown.Item>
                                {!isTokenExpired(accessToken) ? (
                                    <>
                                        {role === 'USER' && (
                                            <Dropdown.Item as={Link} to="/historico">Histórico de pedidos</Dropdown.Item>
                                        )}
                                        {role === 'EMPLOYEE' && (
                                            <Dropdown.Item as={Link} to="/controle">Controle de estoque</Dropdown.Item>
                                        )}
                                        {role === 'ADMIN' && (
                                            <Dropdown.Item as={Link} to="/controle">Gestão de usuários</Dropdown.Item>
                                        )}
                                        <Dropdown.Item as={Link} to="/perfil">Meu perfil</Dropdown.Item>
                                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                    </>
                                ) : (
                                    <Dropdown.Item as={Link} to="/login">Faça login</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <ul className={styles.nav_links}>
                            <li><Link to="/">
                                {role === 'USER' ? <>Cardápio</> : <>Início</>}
                            </Link></li>
                            <li><Link to="/pedido">
                                {role === 'USER' ? <>Pedido</> : <>Pedidos</>}
                            </Link></li>
                            {!isTokenExpired(accessToken) ? (
                                <li>
                                    <Dropdown>
                                        <Dropdown.Toggle as="div" className={styles.user_content} variant="success" id="dropdown-basic">
                                            <FaUserCircle />
                                            <span>{name && name.toUpperCase()}</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {role === 'USER' && (
                                                <Dropdown.Item as={Link} to="/historico">Histórico de pedidos</Dropdown.Item>
                                            )}
                                            {role === 'EMPLOYEE' && (
                                                <Dropdown.Item as={Link} to="/controle">Controle de estoque</Dropdown.Item>
                                            )}
                                            {role === 'ADMIN' && (
                                                <Dropdown.Item as={Link} to="/controle">Gestão de usuários</Dropdown.Item>
                                            )}
                                            <Dropdown.Item as={Link} to="/perfil">Meu perfil</Dropdown.Item>
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
        </>
    )
}

export default Header;