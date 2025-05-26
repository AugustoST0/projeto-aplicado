import styles from './BemVindo.module.css';

function BemVindo() {
    return (
        <div className={styles.top_div}>
            <h1>Bem-vindo à SESI Lanches</h1>
            <p>A lanchonete oficial da sua escola, oferecendo lanches rápidos e saborosos para seu dia de estudos.</p>
        </div>
    )
}

export default BemVindo;