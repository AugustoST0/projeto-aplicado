import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup({ title, description, show, handleClose, withButton }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{description}</p>
            </Modal.Body>

            {withButton && (
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
            )}
        </Modal>
    );
}

export default Popup;
