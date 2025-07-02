import styles from './PedidoFilter.module.css';

function PedidoFilter({ filtro, setFiltro }) {
    return (
        <div className={styles.filtro_container}>
            <label htmlFor="filtro">Filtrar:</label>
            <select
                id="filtro"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className={styles.filtro_select}
            >
                <option value="TODOS">Todos</option>
                <option value="PENDENTE">Pendente</option>
                <option value="PREPARANDO">Preparando</option>
                <option value="PRONTO">Pronto</option>
            </select>
        </div>
    );
}

export default PedidoFilter;