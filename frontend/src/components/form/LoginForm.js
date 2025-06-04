import styles from './Form.module.css';

import { Link } from 'react-router-dom';

import Input from './Input';
import Button from './Button';

import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

function LoginForm({ handleSubmit, setEmail, setPassword }) {
    return (
        <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <Input type="email" placeholder="E-mail" sideImg={<FaEnvelope />} setMethod={setEmail} />
            <Input type="password" placeholder="Senha" sideImg={<FaLock />} setMethod={setPassword} />
            <Button value="Enviar" type="submit" />
            <Link to='/registro' >Não possui conta? Cadastre-se</Link>
        </form>
    )
}

export default LoginForm;