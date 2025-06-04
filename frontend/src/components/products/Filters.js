import styles from './Filters.module.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

function Filters({ currFilter, setCurrFilter }) {

    const setFilter = (filter) => {
        setCurrFilter(filter ? filter.toUpperCase() : null);
    }

    return (
        <div className={styles.filters_content}>
            <h1>Nosso Cardápio</h1>
            <ButtonGroup aria-label="Filtros">
                <Button
                    variant={currFilter === null ? 'primary' : 'secondary'}
                    onClick={() => setFilter(null)}
                >
                    Todos
                </Button>
                <Button
                    variant={currFilter === 'LANCHES' ? 'primary' : 'secondary'}
                    onClick={() => setFilter("LANCHES")}
                >
                    Lanches
                </Button>
                <Button
                    variant={currFilter === 'SALGADOS' ? 'primary' : 'secondary'}
                    onClick={() => setFilter("SALGADOS")}
                >
                    Salgados
                </Button>
                <Button
                    variant={currFilter === 'BEBIDAS' ? 'primary' : 'secondary'}
                    onClick={() => setFilter("BEBIDAS")}
                >
                    Bebidas
                </Button>
                <Button
                    variant={currFilter === 'COMBOS' ? 'primary' : 'secondary'}
                    onClick={() => setFilter("COMBOS")}
                >
                    Combos
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default Filters;
