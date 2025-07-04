import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope } from "react-icons/fa";
import styles from './Form.module.css';

function LoginForm({ handleSubmit, setEmail, setPassword }) {
    return (
        <form className={`container ${styles.form_container} mt-5`} onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Login</h1>

            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingLoginEmail" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="floatingLoginEmail"><FaEnvelope className="me-2" />E-mail</label>
            </div>

            <div className="form-floating mb-4">
                <input type="password" className="form-control" id="floatingLoginPassword" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="floatingLoginPassword"><FaLock className="me-2" />Senha</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">Entrar</button>
            <p className="text-center">
                Não possui conta? <Link to="/registro">Cadastre-se</Link>
            </p>
        </form>
    );
}

export default LoginForm;
