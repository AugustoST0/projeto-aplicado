import styles from './VisaoGeral.module.css';

function VisaoGeral({ pedidosPendentes, emPreparo, prontosParaEntrega }) {
    return (
        <div className={styles.visaoGeralContainer}>
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Pedidos Pendentes</div>
                    <div className={styles.cardValue}>{pedidosPendentes}</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Em Preparo</div>
                    <div className={styles.cardValue}>{emPreparo}</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Prontos para Entrega</div>
                    <div className={styles.cardValue}>{prontosParaEntrega}</div>
                </div>
            </div>
        </div>
    );
}

export default VisaoGeral;
