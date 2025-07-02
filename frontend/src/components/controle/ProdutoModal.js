import { useState, useEffect } from 'react';
import styles from './ProdutoModal.module.css';

import ControlButton from './ControlButton';

function ProdutoModal({ produto, onClose, onSave }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if (produto) {
            setName(produto.name);
            setDescription(produto.description);
            setPrice(produto.price);
            setCategory(produto.category);
            setStock(produto.stock);
        } else {
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setStock('');
        }
    }, [produto]);

    const handleSubmit = () => {
        const produtoData = {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
        };

        if (produto && produto.id) {
            produtoData.id = produto.id;
        }

        onSave(produtoData);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal_content}>
                <div className={styles.modal_header}>
                    <h3>{produto ? 'Editar Produto' : 'Adicionar Produto'}</h3>
                </div>
                <div className={styles.form_group}>
                    <label>Nome do Produto</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.form_group}>
                    <label>Descrição</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={styles.form_group}>
                    <label>Preço</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className={styles.form_group}>
                    <label>Categoria</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Selecione uma categoria</option>
                        <option value="LANCHES">Lanches</option>
                        <option value="SALGADOS">Salgados</option>
                        <option value="BEBIDAS">Bebidas</option>
                        <option value="COMBOS">Combos</option>
                    </select>
                </div>
                <div className={styles.form_group}>
                    <label>Estoque</label>
                    <input
                        type="number"
                        value={stock}
                        min={0}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className={styles.modal_actions}>
                    <ControlButton variant="action_button" handleClick={onClose} text="Cancelar" />
                    <ControlButton variant="action_button" handleClick={handleSubmit} text="Salvar" />
                </div>
            </div>
        </div>
    );
}

export default ProdutoModal;
