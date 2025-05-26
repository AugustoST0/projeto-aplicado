import api from '../../../services/api';

import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePopup } from '../../../contexts/PopupContext';

import LoginForm from '../../form/LoginForm';
import Container from '../../layout/Container';

import Popup from '../../layout/Popup';

function Login() {

    const { login } = useAuth();
    const { showPopup, popupData, handleShowPopup, handleClosePopup } = usePopup();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/v1/auth/login', {
                email: email,
                password: password
            });
            const token = response.data.token;
            login(token);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                handleShowPopup('Erro de Login', 'E-mail ou senha inválidos');
            } else {
                handleShowPopup('Erro de Conexão', 'Não foi possível conectar ao servidor.');
            }
        }
    };

    return (
        <>
            <Container customClass="auth_container">
                <LoginForm handleSubmit={submit} setEmail={setEmail} setPassword={setPassword} />
            </Container>
            <Popup
                title={popupData.title}
                description={popupData.description}
                show={showPopup}
                handleClose={handleClosePopup}
                withButton={false}
            />
        </>
    )
}

export default Login;