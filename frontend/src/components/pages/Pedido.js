import styles from './Pedido.module.css';

import Button from 'react-bootstrap/Button';
import Container from '../layout/Container';
import PedidoComposition from '../orders/PedidoComposition';
import DatePicker from '../orders/DatePicker';
import Popup from '../layout/Popup';
import PedidoFilter from '../orders/PedidoFilter';
import PedidoCardFuncionario from '../orders/PedidoCardFuncionario';

import api from '../../services/api';

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import { usePopup } from '../../contexts/PopupContext';
import { useState, useEffect } from 'react';

function Pedido() {

    const { role } = useAuth();
    const { carrinho, total, clearCarrinho } = useCarrinho();
    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const [selectedDate, setSelectedDate] = useState('');
    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);

    const [orders, setOrders] = useState([]);
    const [filtro, setFiltro] = useState('TODOS');

    const navigate = useNavigate();

    const deliverDateTime = `${selectedDate}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;

    const bookOrder = () => {
        api.post('/api/v1/orders', {
            status: "PENDENTE",
            orderDateTime: new Date().toISOString().slice(0, 19),
            deliverDateTime: deliverDateTime,
            orderItemList: carrinho.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        })
            .then(() => {
                showCustomPopup({
                    title: 'Pedido reservado com sucesso',
                    description: 'Retire o pedido no horário e data escolhidos',
                    handleBtn: () => {
                        clearCarrinho();
                        navigate('/');
                    }
                })
            })
            .catch(err => {
                console.error(err);
                showCustomPopup({
                    title: 'Erro ao reservar pedido',
                    description: 'Por favor tente novamente',
                })
            })
    }

    const atualizarStatus = (id, novoStatus) => {
        api.put(`/api/v1/orders/${id}/status`, novoStatus, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => {
                setOrders(prev => prev.map(order =>
                    order.id === id ? { ...order, status: novoStatus } : order
                ));
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if (role === 'EMPLOYEE') {
            api.get('/api/v1/orders')
                .then(res => setOrders(res.data))
                .catch(err => console.error(err));
        }
    }, [role]);

    const pedidosFiltrados = filtro === 'TODOS' ? orders : orders.filter(o => o.status === filtro);

    return (
        <>
            {role === 'USER' && (
                <>
                    <Container customClass="main_container">
                        <div className={styles.order_container}>
                            <h1>Meu Pedido</h1>
                            <PedidoComposition />
                            <p>Total: R$ {total.toFixed(2).replace('.', ',')}</p>
                            <DatePicker
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                hour={hour}
                                setHour={setHour}
                                minute={minute}
                                setMinute={setMinute}
                            />
                            <div className={styles.order_buttons}>
                                <Button
                                    variant='outline-primary'
                                    onClick={() => {
                                        if (!selectedDate) {
                                            showCustomPopup({
                                                title: 'Data não selecionada',
                                                description: 'Por favor, selecione uma data de entrega.',
                                            });
                                            return;
                                        }

                                        if (carrinho.length === 0) {
                                            showCustomPopup({
                                                title: 'Carrinho vazio',
                                                description: 'Adicione pelo menos um item ao carrinho antes de fazer o pedido.',
                                            });
                                            return;
                                        }

                                        showCustomPopup({
                                            title: 'Deseja reservar pedido?',
                                            description: 'Pagamento será realizado no momento da entrega.',
                                            withButton: true,
                                            btnText: 'Reservar',
                                            handleBtn: bookOrder,
                                        });
                                    }}
                                >
                                    Reservar Pedido
                                </Button>
                            </div>
                        </div>
                    </Container>
                    <Popup
                        title={popupConfig.title}
                        description={popupConfig.description}
                        show={popupConfig.show}
                        handleClose={handleClosePopup}
                        withButton={popupConfig.withButton}
                        btnText={popupConfig.btnText}
                        handleBtn={popupConfig.handleBtn}
                    />
                </>
            )}
            {role === 'EMPLOYEE' && (
                <>
                    <Container customClass="nonuser_container">
                        <h2 style={{
                            color: '#000',
                            margin: '1em 0 1em 0',
                            fontSize: '1.5em',
                            fontWeight: 'bold'
                        }} className="mb-0">Pedidos Recebidos</h2>
                        <PedidoFilter filtro={filtro} setFiltro={setFiltro} />
                        <div className={styles.order_list}>
                            {pedidosFiltrados.map(order => (
                                <PedidoCardFuncionario
                                    key={order.id}
                                    order={order}
                                    numeroPedido={order.id}
                                    atualizarStatus={atualizarStatus}
                                />
                            ))}
                        </div>
                    </Container>
                </>
            )}
        </>
    )
}

export default Pedido;