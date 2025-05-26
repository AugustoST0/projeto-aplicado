import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Popup from '../layout/Popup';

import { usePopup } from '../../contexts/PopupContext';

import styles from './ProductCard.module.css';

function ProductCard({ imgSrc, title, description, price }) {
    const { showPopup, popupData, handleShowPopup, handleClosePopup} = usePopup();

    return (
        <>
            <Card className={styles.card}>
                <Card.Img variant="top" src={imgSrc} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text style={{ color: '#e53935', fontWeight: 700 }}>R$ {price}</Card.Text>
                    <Button variant="primary" onClick={handleShowPopup('titulo', 'descrição')}>Adicionar ao pedido</Button>
                </Card.Body>
            </Card>
            <Popup
                title={popupData.title}
                description={popupData.description}
                show={showPopup}
                handleClose={handleClosePopup}
                withButton={false}
            />
        </>
    )
}

export default ProductCard;