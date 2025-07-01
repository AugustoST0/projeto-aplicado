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
            <Modal.Footer>
                <Button
                    variant={withButton ? "secondary" : "primary"}
                    onClick={() => {
                        (!withButton && handleBtn) && handleBtn();
                        handleClose();
                    }}
                >
                    {withButton ? "Cancelar" : "Fechar"}
                </Button>
                {withButton && (
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
        </Modal>
    );
}

export default Popup;
