import styles from './PedidoFilter.module.css';
import Form from 'react-bootstrap/Form';

function PedidoFilter({ filtro, setFiltro }) {
    return (
        <div className={styles.filtro_container}>
            <Form.Select
                id="filtro"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className={styles.filtro_select}
                aria-label="Filtro de pedidos"
            >
                <option value="TODOS">Todos</option>
                <option value="PENDENTE">Pendente</option>
                <option value="PREPARANDO">Preparando</option>
                <option value="PRONTO">Pronto</option>
            </Form.Select>
        </div>
    );
}

export default PedidoFilter;
