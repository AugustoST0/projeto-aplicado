import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';
import { useAuth } from '../../contexts/AuthContext';

function Footer() {
    const { role } = useAuth();

    return (
        <>
            {role === 'USER' && (
                <div className={styles.footer_container}>
                    <Container>
                        <Row className={styles.footer_content}>
                            <Col xs={12} md={4} className={styles.footer_section}>
                                <h3>SESI Lanches</h3>
                                <p>A lanchonete oficial do SESI, oferecendo lanches rápidos e nutritivos.</p>
                            </Col>
                            <Col xs={12} md={4} className={styles.footer_section}>
                                <h3>Horário de Funcionamento</h3>
                                <p>Segunda a Sexta</p>
                                <p>08:00 - 21:00</p>
                            </Col>
                            <Col xs={12} md={4} className={styles.footer_section}>
                                <h3>Contato</h3>
                                <p>lanches@sesi.com.br</p>
                                <p>(XX) XXXX-XXXX</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col className={styles.copyright} xs={12}>
                                <p>&copy; 2025 SESI Lanches. Todos os direitos reservados.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </>
    );
}

export default Footer;
