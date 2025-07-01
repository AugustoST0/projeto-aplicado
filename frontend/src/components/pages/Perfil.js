import styles from './Perfil.module.css'

import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';

import Button from 'react-bootstrap/Button'

import Container from '../layout/Container';
import Popup from '../layout/Popup';
import EditUser from '../profile/EditUser';

import api from '../../services/api';

import { usePopup } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';

import { useState, useEffect } from 'react';

function Perfil() {

    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const { email, refreshToken, login, logout } = useAuth();
    const [user, setUser] = useState(null);

    const [newName, setNewName] = useState(user && user.name);
    const [newEmail, setNewEmail] = useState(user && user.email);
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    useEffect(() => {
        api.get('/api/v1/users/porEmail?email=' + email)
            .then(res => setUser(res.data))
            .catch(err => console.error(err))
    }, [email])

    useEffect(() => {
        setNewName(user && user.name);
        setNewEmail(user && user.email);
    }, [user])

    const alterInfo = (e) => {
        e.preventDefault();

        if (newPassword && confirmedPassword && newPassword !== confirmedPassword) {
            showCustomPopup({
                title: 'Senhas não conferem',
                description: 'As senhas informadas são diferentes. Tente novamente.'
            });
            return;
        }

        if (newName === user.name && newEmail === user.email && !newPassword) {
            showCustomPopup({
                title: 'Os dados não diferem',
                description: 'Os dados devem ser diferentes. Tente novamente.'
            });
            return;
        }

        api.put('/api/v1/users', {
            id: user.id,
            name: newName || user.name,
            email: newEmail || user.email,
            password: newPassword || user.password,
            role: user.role
        })
            .then(res => {
                const newAccessToken = res.data.newAccessToken;
                const decoded = jwtDecode(newAccessToken);

                login({
                    accessToken: newAccessToken, refreshToken
                }, false);

                setUser({
                    ...user,
                    name: decoded.name,
                    email: decoded.email
                });

                showCustomPopup({
                    title: 'Usuário editado com sucesso',
                    description: 'Os seus dados foram alterados',
                });
            })
            .catch(err => {
                const errorMessage = err.response?.data?.message || 'Erro ao atualizar usuário';

                showCustomPopup({
                    title: 'Erro',
                    description: errorMessage,
                });
            });

    }

    const deleteUser = () => {
        api.delete(`/api/v1/users/${user.id}`)
            .then(() => {
                showCustomPopup({
                    title: 'Usuário deletado com sucesso',
                    description: 'A sua conta foi deletada',
                });
            })
            .then(() => logout())
            .catch(err => {
                const errorMessage = err.response?.data?.message || 'Erro ao deletar usuário';

                showCustomPopup({
                    title: 'Erro',
                    description: errorMessage,
                });

                console.error(err)
            })
    }

    return (
        <>
            <Container customClass="main_container">
                <div className={styles.perfil_container}>
                    <div className={styles.perfil_top}>
                        <FaUserCircle />
                        <h2>{user && user.name.toUpperCase()}</h2>
                    </div>
                    <EditUser
                        newName={newName}
                        setNewName={setNewName}
                        newEmail={newEmail}
                        setNewEmail={setNewEmail}
                        setNewPassword={setNewPassword}
                        setConfirmedPassword={setConfirmedPassword}
                        handleAlterInfo={alterInfo}
                    />
                    <div className={styles.perfil_bottom}>
                        <h3>Zona de perigo</h3>
                        <div>
                            <Button variant="danger" onClick={deleteUser}>Deletar conta</Button>
                        </div>
                    </div>
                </div>
            </Container>
            <Popup
                title={popupConfig.title}
                description={popupConfig.description}
                show={popupConfig.show}
                handleClose={handleClosePopup}
                withButton={popupConfig.withButton}
                btnText={popupConfig.btnText}
                handleBtn={popupConfig.handleBtn}
            />
        </>
    )
}

export default Perfil;