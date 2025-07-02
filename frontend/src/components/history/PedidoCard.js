import styles from './PedidoCard.module.css';

function formatDate(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function PedidoCard({ order, numeroPedido }) {
    return (
        <div className={styles.pedido_card}>
            <h3>Pedido #{numeroPedido}</h3>

            <p><strong>Status:</strong> <span className={`${styles.status} ${styles[order.status]}`}>{order.status}</span></p>
            <p><strong>Data do pedido:</strong> {formatDate(order.orderDateTime)}</p>
            <p><strong>Data de entrega:</strong> {formatDate(order.deliverDateTime)}</p>

            <div>
                <h4>Itens:</h4>
                <ul>
                    {order.orderItemList.map(item => (
                        <li key={item.id}>
                            {item.product.name} - {item.quantity}x - R${(item.product.price * item.quantity).toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default PedidoCard;
