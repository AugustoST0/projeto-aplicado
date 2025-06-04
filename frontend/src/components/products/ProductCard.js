import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './ProductCard.module.css';

function ProductCard({ product, handleOnClick }) {

    return (
        <>
            <Card className={styles.card}>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    
                    <Card.Text>{product.description}</Card.Text>

                    <Card.Text style={{ color: '#e53935', fontWeight: 700 }}>
                        R$ {product.price.toFixed(2).replace('.', ',')}
                    </Card.Text>

                    <Button variant="primary" onClick={handleOnClick}>
                        Adicionar ao pedido
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductCard;