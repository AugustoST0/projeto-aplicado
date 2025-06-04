import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import styles from './Quantidade.module.css';

function Quantidade({ quantity, setQuantity }) {

    const add = () => {
        setQuantity(prev => prev + 1);
    }

    const subtract = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    }

    return (
        <div className={styles.quantity_container}>
            <Button variant="secondary" onClick={subtract}>-</Button>
            <Form.Control
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <Button variant="secondary" onClick={add}>+</Button>
        </div>
    )
}

export default Quantidade;