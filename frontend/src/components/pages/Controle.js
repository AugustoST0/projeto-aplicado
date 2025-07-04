import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';

import Container from '../layout/Container';
import ProdutoTabela from '../controle/ProdutoTabela';
import ProdutoModal from '../controle/ProdutoModal';
import Popup from '../layout/Popup';

import { Button } from 'react-bootstrap';

import api from '../../services/api';
import { usePopup } from '../../contexts/PopupContext';

function Controle() {
    const navigate = useNavigate();
    const { role } = useAuth();
    const { popupConfig, handleClosePopup, showCustomPopup } = usePopup();

    const [produtos, setProdutos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    useEffect(() => {
        if (role !== 'EMPLOYEE') navigate('/');
        fetchProdutos();
    }, [role]);

    const fetchProdutos = () => {
        api.get('/api/v1/products')
            .then(res => setProdutos(res.data))
            .catch(err => console.error(err));
    };

    const handleOpenModal = (produto = null) => {
        setProdutoSelecionado(produto);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setProdutoSelecionado(null);
    };

    const handleSaveProduto = async (produto) => {
        try {
            if (produto.id) {
                const { id, ...data } = produto;
                await api.put(`/api/v1/products/${id}`, data);
                showCustomPopup({
                    title: "Produto atualizado",
                    description: `O produto \"${produto.name}\" foi atualizado com sucesso.`
                });
            } else {
                await api.post('/api/v1/products', produto);
                showCustomPopup({
                    title: "Produto adicionado",
                    description: `O produto foi adicionado com sucesso.`
                });
            }
            fetchProdutos();
            handleCloseModal();
        } catch (err) {
            console.error(err);
            showCustomPopup({
                title: "Erro ao salvar produto",
                description: "Ocorreu um erro ao salvar o produto. Verifique os dados e tente novamente."
            });
        }
    };

    const handleConfirmDeleteProduto = (id, name) => {
        showCustomPopup({
            title: 'Confirmar exclusão',
            description: `Tem certeza que deseja excluir o produto \"${name}\"? Esta ação não poderá ser desfeita.`,
            withButton: true,
            btnText: 'Excluir',
            handleBtn: () => handleDeleteProduto(id)
        });
    };

    const handleDeleteProduto = async (id) => {
        try {
            await api.delete(`/api/v1/products/${id}`);
            showCustomPopup({
                title: "Produto deletado",
                description: `O produto foi deletado com sucesso.`
            });
            fetchProdutos();
        } catch (err) {
            console.error(err);
            showCustomPopup({
                title: "Erro ao deletar produto",
                description: "Ocorreu um erro ao deletar o produto. Tente novamente."
            });
        }
    };

    return (
        <>
            <Container customClass="nonuser_container">
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 style={{
                            color: '#000',
                            margin: '1em 0 1em 0',
                            fontSize: '1.5em',
                            fontWeight: 'bold'
                        }} className="m-0">Gerenciamento de Produtos</h2>
                        <Button onClick={() => handleOpenModal()}>Adicionar produto</Button>
                    </div>
                    <ProdutoTabela
                        produtos={produtos}
                        onEdit={handleOpenModal}
                        onDeleteConfirm={handleConfirmDeleteProduto}
                    />
                    {showModal && (
                        <ProdutoModal
                            produto={produtoSelecionado}
                            onClose={handleCloseModal}
                            onSave={handleSaveProduto}
                            showCustomPopup={showCustomPopup}
                        />
                    )}
                </div>
            </Container >
            <Popup {...popupConfig} handleClose={handleClosePopup} />
        </>
    );
}

export default Controle;
