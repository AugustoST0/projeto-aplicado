import api from '../../../services/api';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CadastroForm from '../../form/CadastroForm';
import Container from '../../layout/Container';

function Cadastro() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("Senhas diferentes");
            return;
        }

        api.post('/api/v1/auth/register', {
            name: name,
            email: email,
            password: password,
            role: "USER"
        })
            .then(() => navigate('/'))
            .catch(error => console.error(error))
    }

    return (
        <Container customClass="auth_container" >
            <CadastroForm
                handleSubmit={submit}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword} />
        </Container>
    )
}

export default Cadastro;