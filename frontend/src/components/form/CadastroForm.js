import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import styles from './Form.module.css';

function CadastroForm({ handleSubmit, setName, setEmail, setPassword, setConfirmPassword }) {
    return (
        <form className={`container ${styles.form_container} mt-5`} onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Cadastro</h1>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingName" placeholder="Nome" onChange={(e) => setName(e.target.value)} />
                <label htmlFor="floatingName"><FaUser className="me-2" />Nome</label>
            </div>

            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingEmail" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="floatingEmail"><FaEnvelope className="me-2" />E-mail</label>
            </div>

            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword"><FaLock className="me-2" />Senha</label>
            </div>

            <div className="form-floating mb-4">
                <input type="password" className="form-control" id="floatingConfirm" placeholder="Confirmar Senha" onChange={(e) => setConfirmPassword(e.target.value)} />
                <label htmlFor="floatingConfirm"><FaLock className="me-2" />Confirmar Senha</label>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">Cadastrar</button>
            <p className="text-center">
                Já possui conta? <Link to="/login">Faça login</Link>
            </p>
        </form>
    );
}

export default CadastroForm;
