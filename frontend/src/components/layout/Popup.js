import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup({ title, description, show, handleClose, withButton, btnText, handleBtn }) {

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {description}
            </Modal.Body>

            {withButton && (
                <Modal.Footer>
                    <Button
                        variant={btnText === '' ? "primary" : "secondary"}
                        onClick={() => {
                            handleBtn && handleBtn();
                            handleClose();
                        }}
                    >
                        {btnText === '' ? "Fechar" : "Cancelar"}
                    </Button>
                    {btnText !== '' && (
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleBtn();
                                handleClose();
                            }}
                        >
                            {btnText}
                        </Button>
                    )}
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default Popup;
