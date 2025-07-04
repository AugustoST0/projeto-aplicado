import styles from './Filters.module.css';
import Form from 'react-bootstrap/Form';

function Filters({ currFilter, setCurrFilter }) {

    const handleChange = (e) => {
        const value = e.target.value;
        setCurrFilter(value !== "" ? value.toUpperCase() : null);
    };

    return (
        <div className={styles.filters_content}>
            <Form.Select
                aria-label="Filtro de produtos"
                value={currFilter || ""}
                onChange={handleChange}
                className={styles.select}
            >
                <option value="">Todos</option>
                <option value="LANCHES">Lanches</option>
                <option value="SALGADOS">Salgados</option>
                <option value="BEBIDAS">Bebidas</option>
                <option value="COMBOS">Combos</option>
            </Form.Select>
        </div>
    );
}

export default Filters;
