import styles from './Perfil.module.css'

import { FaUserCircle } from "react-icons/fa";

import Button from 'react-bootstrap/Button'

import Container from '../layout/Container';
import Popup from '../layout/Popup';
import EditUser from '../profile/EditUser';

import api from '../../services/api';

import { usePopup } from '../../contexts/PopupContext';

import { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';

function Perfil() {

    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const { email, refresh } = useAuth();
    const [user, setUser] = useState(null);

    const [newName, setNewName] = useState(user && user.name);
    const [newEmail, setNewEmail] = useState(user && user.email);
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    useEffect(() => {
        api.get('/api/v1/users/porEmail?email=' + email)
            .then(res => setUser(res.data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        setNewName(user && user.name);
        setNewEmail(user && user.email);
    }, [user])

    const alterInfo = (e) => {
        e.preventDefault();

        if (newPassword && confirmedPassword && newPassword !== confirmedPassword) {
            showCustomPopup({
                title: 'Senhas não conferem',
                description: 'As senhas informadas são diferentes. Tente novamente.',
                withButton: true
            });
            return;
        }

        if (newName === user.name && newEmail === user.email) {
            showCustomPopup({
                title: 'Os dados não diferem',
                description: 'Os dados devem ser diferentes. Tente novamente.',
                withButton: true
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
            .then(res => setUser(res.data))
            .then(() => {
                showCustomPopup({
                    title: 'Usuário editado com sucesso',
                    description: 'Os seus dados foram alterados',
                    withButton: true
                });
                refresh();
            })
            .catch(err => console.error(err))
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
                            <Button variant="danger">Deletar conta</Button>
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