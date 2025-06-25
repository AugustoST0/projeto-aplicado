import styles from './EditUser.module.css'

import Button from 'react-bootstrap/Button'

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function EditUser({ newName, setNewName, newEmail, setNewEmail, setNewPassword, setConfirmedPassword, handleAlterInfo }) {

    return (
        <div className={styles.perfil_middle}>
            <h3>Editar informações de usuário</h3>
            <Form onSubmit={handleAlterInfo} className={styles.edit_form}>
                <div className={styles.fields}>
                    <div>
                        <FloatingLabel
                            label="Nome de usuário"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                placeholder="Nome de usuário"
                                defaultValue={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="E-mail"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder="E-mail"
                                defaultValue={newEmail}
                                onChange={((e) => setNewEmail(e.target.value))}
                            />
                        </FloatingLabel>
                    </div>
                    <div>
                        <FloatingLabel
                            label="Nova senha"
                            className="mb-3"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Nova senha"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </FloatingLabel>
                        <FloatingLabel
                            label="Confirmar senha"
                            className="mb-3"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Confirmar senha"
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                            />
                        </FloatingLabel>
                    </div>
                </div>
                <Button variant="primary" type="submit">Alterar informações</Button>
            </Form>
        </div>
    )
}

export default EditUser;