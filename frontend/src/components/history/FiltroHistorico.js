import Form from 'react-bootstrap/Form';
import styles from './FiltroHistorico.module.css';

function FiltroHistorico({ currFilter, setCurrFilter }) {

    const handleChange = (e) => {
        const value = e.target.value;
        setCurrFilter(value !== "" ? value.toUpperCase() : null);
    };

    return (
        <div className={styles.filter_container}>
            <Form.Select
                aria-label="Filtro de categoria"
                value={currFilter || ""}
                onChange={handleChange}
                className="mb-3"
            >
                <option value="">Todos</option>
                <option value="PENDENTE">Pendente</option>
                <option value="PREPARANDO">Preparando</option>
                <option value="PRONTO">Pronto</option>
                <option value="ENTREGUE">Entregue</option>
            </Form.Select>
        </div>
    );
}

export default FiltroHistorico;
