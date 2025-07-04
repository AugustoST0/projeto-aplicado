import styles from './VisaoGeral.module.css';

function VisaoGeral({ pedidosPendentes, emPreparo, prontosParaEntrega }) {
    return (
        <div className={styles.vg_container}>
            <div className={styles.cards_container}>
                <div className={styles.card}>
                    <div className={styles.card_title}>Pedidos Pendentes</div>
                    <div className={styles.card_value}>{pedidosPendentes}</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_title}>Em Preparo</div>
                    <div className={styles.card_value}>{emPreparo}</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.card_title}>Prontos para Entrega</div>
                    <div className={styles.card_value}>{prontosParaEntrega}</div>
                </div>
            </div>
        </div>
    );
}

export default VisaoGeral;
