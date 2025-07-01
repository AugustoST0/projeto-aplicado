import styles from './Historico.module.css';

import Container from "../layout/Container";
import HistoricoComposition from '../history/HistoricoComposition';

function Historico() {

    return (
        <>
            <Container customClass="main_container">
                <div className={styles.historico_container}>
                    <h1>Histórico de pedidos</h1>
                    <HistoricoComposition />
                </div>
            </Container>
        </>
    )
}

export default Historico;