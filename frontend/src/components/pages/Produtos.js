import styles from './Produtos.module.css';

import api from '../../services/api';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { usePopup } from '../../contexts/PopupContext';
import { useCarrinho } from '../../contexts/CarrinhoContext';

import Container from '../layout/Container';
import ProductCard from '../products/ProductCard';
import BemVindo from '../products/BemVindo';
import Popup from '../layout/Popup';
import Quantidade from '../products/Quantidade';
import Filters from '../products/Filters';
import VisaoGeral from '../products/VisaoGeral';

function Produtos() {

    const { role } = useAuth();
    const { handleAdd } = useCarrinho();
    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const [products, setProducts] = useState([]);
    const [currFilter, setCurrFilter] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [orders, setOrders] = useState([]);
    const [pendentes, setPendentes] = useState([]);
    const [emPreparo, setEmPreparo] = useState([]);
    const [prontos, setProntos] = useState([]);

    useEffect(() => {
        role === 'USER' ?
            api.get('/api/v1/products')
                .then(res => {
                    setProducts(res.data)
                })
                .catch(err => console.error(err))
            : api.get('/api/v1/orders')
                .then(res => {
                    setOrders(res.data);
                })
                .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if (orders.length !== 0) {
            setPendentes(orders.filter(order => order.status === 'PENDENTE'));
            setEmPreparo(orders.filter(order => order.status === 'PREPARANDO'));
            setProntos(orders.filter(order => order.status === 'PRONTO'));
        }
    }, [orders]);

    return (
        <>
            <Container customClass={role === 'EMPLOYEE' || role === 'ADMIN' ? 'nonuser_container' : 'main_container'}>
                <BemVindo />
                <h1 className={styles.title}>
                    {role === 'USER' ? <>Nosso Cardápio</> : <>Visão geral</>}
                </h1>
                {role === 'USER' ?
                    <>
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
                    </> : <>
                        <VisaoGeral
                            pedidosPendentes={pendentes.length}
                            emPreparo={emPreparo.length}
                            prontosParaEntrega={prontos.length}
                        />
                    </>
                }
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