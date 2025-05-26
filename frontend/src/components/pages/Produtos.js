import styles from './Produtos.module.css';

import api from '../../services/api';

import { useState, useEffect } from 'react';

import Container from '../layout/Container';
import ProductCard from '../products/ProductCard';
import BemVindo from '../products/BemVindo';

function Produtos() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/api/v1/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <Container customClass="main_container">
            <BemVindo />
            <div className={styles.products_container}>
                {products.length > 0 && (
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            imgSrc={product.image}
                            title={product.name}
                            description={product.description}
                            price={product.price.toFixed(2).replace('.', ',')}
                        />
                    ))
                )}
            </div>
        </Container>
    )
}

export default Produtos;