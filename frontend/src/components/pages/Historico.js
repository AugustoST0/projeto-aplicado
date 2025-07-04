import styles from './Historico.module.css';

import Container from "../layout/Container";
import HistoricoComposition from '../history/HistoricoComposition';
import FiltroHistorico from '../history/FiltroHistorico';

import { useState } from 'react';

function Historico() {
    const [currFilter, setCurrFilter] = useState(null);

    return (
        <Container customClass="main_container">
            <div className={styles.historico_container}>
                <h1>Histórico de pedidos</h1>
                <FiltroHistorico currFilter={currFilter} setCurrFilter={setCurrFilter} />
                <HistoricoComposition currFilter={currFilter} />
            </div>
        </Container>
    );
}

export default Historico;
