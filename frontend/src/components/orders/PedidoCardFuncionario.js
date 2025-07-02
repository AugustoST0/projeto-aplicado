import styles from './PedidoCardFuncionario.module.css';

function PedidoCardFuncionario({ order, numeroPedido, atualizarStatus }) {
    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDENTE': return styles.status_pendente;
            case 'PREPARANDO': return styles.status_preparando;
            case 'PRONTO': return styles.status_pronto;
            default: return '';
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.titulo}>Pedido #{numeroPedido}</h3>
                <span className={`${styles.status} ${getStatusClass(order.status)}`}>{order.status}</span>
            </div>
            <p><strong>Cliente:</strong> {order.user.name}</p>
            <p><strong>Itens:</strong> {order.orderItemList.map(i => i.product.name).join(', ')}</p>
            <p><strong>Horário:</strong> {new Date(order.deliverDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>

            {order.status === 'PENDENTE' && (
                <button className={styles.botao} onClick={() => atualizarStatus(order.id, 'PREPARANDO')}>
                    Iniciar Preparo
                </button>
            )}
            {order.status === 'PREPARANDO' && (
                <button className={styles.botao} onClick={() => atualizarStatus(order.id, 'PRONTO')}>
                    Marcar como Pronto
                </button>
            )}
        </div>
    );
}

export default PedidoCardFuncionario;