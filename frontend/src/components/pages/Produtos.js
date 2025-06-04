import styles from './Produtos.module.css';

import api from '../../services/api';

import { useState, useEffect } from 'react';
import { usePopup } from '../../contexts/PopupContext';
import { useCarrinho } from '../../contexts/CarrinhoContext';

import Container from '../layout/Container';
import ProductCard from '../products/ProductCard';
import BemVindo from '../products/BemVindo';
import Popup from '../layout/Popup';
import Quantidade from '../products/Quantidade';
import Filters from '../products/Filters';

function Produtos() {
    const { handleAdd } = useCarrinho();
    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const [products, setProducts] = useState([]);
    const [currFilter, setCurrFilter] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        api.get('/api/v1/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            <Container customClass="main_container">
                <BemVindo />
                <Filters currFilter={currFilter} setCurrFilter={setCurrFilter} />
                <div className={styles.products_container}>
                    {products.length > 0 &&
                        (currFilter === null
                            ? products
                            : products.filter(product => product.category === currFilter))
                            .map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    handleOnClick={() => {
                                        setQuantity(1);
                                        showCustomPopup({
                                            title: `Selecione a quantidade de ${product.name}`,
                                            description: '',
                                            withButton: true,
                                            btnText: 'Adicionar',
                                            handleBtn: () => {
                                                handleAdd(product, quantity);
                                            }
                                        })
                                    }}
                                />
                            ))
                    }
                </div>
            </Container>
            <Popup
                title={popupConfig.title}
                description={<Quantidade quantity={quantity} setQuantity={setQuantity} />}
                show={popupConfig.show}
                handleClose={handleClosePopup}
                withButton={popupConfig.withButton}
                btnText={popupConfig.btnText}
                handleBtn={popupConfig.handleBtn}
            />
        </>

    )
}

export default Produtos;