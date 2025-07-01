import api from '../../../services/api';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopup } from '../../../contexts/PopupContext';

import CadastroForm from '../../form/CadastroForm';
import Container from '../../layout/Container';
import Popup from '../../layout/Popup';

function Cadastro() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showCustomPopup({
                title: 'Senhas não conferem',
                description: 'As senhas informadas são diferentes. Tente novamente.',
            })
            return;
        }

        api.post('/api/v1/auth/register', {
            name: name,
            email: email,
            password: password,
            role: "USER"
        })
            .then(() => {
                showCustomPopup({
                    title: 'Cadastro realizado',
                    description: 'O seu cadastro foi bem sucedido',
                })
            })
            .then(() => navigate('/login'))
            .catch(error => console.error(error))
    }

    return (
        <>
            <Container customClass="auth_container" >
                <CadastroForm
                    handleSubmit={submit}
                    setName={setName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword} />
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

export default Cadastro;