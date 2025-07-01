import api from '../../../services/api';

import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePopup } from '../../../contexts/PopupContext';

import LoginForm from '../../form/LoginForm';
import Container from '../../layout/Container';

import Popup from '../../layout/Popup';

function Login() {

    const { login } = useAuth();
    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/v1/auth/login', {
                email: email,
                password: password
            });
            login(response.data);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                showCustomPopup({
                    title: 'Erro de Login',
                    description: 'E-mail ou senha inválidos',
                });
            } else {
                showCustomPopup({
                    title: 'Erro de Conexão',
                    description: 'Não foi possível conectar ao servidor',
                });
            }
        }
    };

    return (
        <>
            <Container customClass="auth_container">
                <LoginForm handleSubmit={submit} setEmail={setEmail} setPassword={setPassword} />
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

export default Login;