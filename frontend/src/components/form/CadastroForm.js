import styles from './Form.module.css';

import { Link } from 'react-router-dom';

import Input from './Input';
import Button from './Button';

import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

function CadastroForm({ handleSubmit, setName, setEmail, setPassword, setConfirmPassword }) {
    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Cadastro</h1>
            <Input type="text" placeholder="Nome" sideImg={<FaUser />} setMethod={setName} />
            <Input type="email" placeholder="E-mail" sideImg={<FaEnvelope />} setMethod={setEmail} />
            <Input type="password" placeholder="Senha" sideImg={<FaLock />} setMethod={setPassword} />
            <Input type="password" placeholder="Confirmar senha" sideImg={<FaLock />} setMethod={setConfirmPassword} />
            <Button type="submit" value="Enviar" />
            <Link to='/login'>Já possui conta? Faça login</Link>
        </form>
    )
}

export default CadastroForm;