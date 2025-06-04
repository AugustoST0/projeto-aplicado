import Button from 'react-bootstrap/Button';
import styles from './PedidoItem.module.css';

function PedidoItem({ item, handleOnClick }) {
    return (
        <div className={styles.item}>
            <div>
                <span className={styles.item_name}>
                    {item.name}
                </span>
                <span>R$ {item.price.toFixed(2).replace('.', ',')} x {item.quantity}</span>
            </div>
            <div>
                <span className={styles.subtotal}>
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </span>
                <Button variant="danger" onClick={handleOnClick}>Remover</Button>
            </div>
        </div>
    )
}

export default PedidoItem;