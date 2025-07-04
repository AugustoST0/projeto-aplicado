import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

function ProdutoModal({ produto, onClose, onSave, showCustomPopup }) {
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
        // validação de campos
        if (
            name.trim() === '' ||
            description.trim() === '' ||
            price === '' ||
            stock === '' ||
            category.trim() === ''
        ) {
            showCustomPopup({
                title: 'Campos obrigatórios',
                description: 'Preencha todos os campos antes de salvar.'
            });
            return;
        }

        // validação de alteração
        if (produto) {
            const noChanges =
                produto.name === name.trim() &&
                produto.description === description.trim() &&
                parseFloat(produto.price) === parseFloat(price) &&
                parseInt(produto.stock) === parseInt(stock) &&
                produto.category === category;

            if (noChanges) {
                showCustomPopup({
                    title: 'Nenhuma alteração detectada',
                    description: 'Nenhum dado foi modificado. Edite algo antes de salvar.'
                });
                return;
            }
        }

        // dados prontos
        const produtoData = {
            name: name.trim(),
            description: description.trim(),
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
        <Modal show onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{produto ? 'Editar Produto' : 'Adicionar Produto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome do Produto</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '' || parseFloat(value) >= 0) {
                                            setPrice(value);
                                        }
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Estoque</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={0}
                                    step="1"
                                    value={stock}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '' || parseInt(value) >= 0) {
                                            setStock(value);
                                        }
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            <option value="LANCHES">Lanches</option>
                            <option value="SALGADOS">Salgados</option>
                            <option value="BEBIDAS">Bebidas</option>
                            <option value="COMBOS">Combos</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProdutoModal;
