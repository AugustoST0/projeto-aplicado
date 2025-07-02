import styles from './Footer.module.css';

import Container from './Container';
import FooterSection from './FooterSection';

import { useAuth } from '../../contexts/AuthContext';

function Footer() {

    const { role } = useAuth();

    return (
        <>
            {role === 'USER' && (
                <Container customClass='footer_container'>
                    <div className={styles.footer_content}>
                        <FooterSection
                            title="SESI Lanches"
                            p1="A lanchonete oficial do SESI, oferecendo lanches rápidos e nutritivos."
                        />
                        <FooterSection
                            title="Horário de Funcionamento"
                            p1="Segunda a Sexta"
                            p2="08:00 - 21:00"
                        />
                        <FooterSection
                            title="Contato"
                            p1="lanches@sesi.com.br"
                            p2="(XX) XXXX-XXXX"
                        />
                    </div>

                    <div className={styles.copyright}>
                        <p>&copy; 2025 SESI Lanches. Todos os direitos reservados.</p>
                    </div>
                </Container >
            )}
        </>
    )
}

export default Footer;