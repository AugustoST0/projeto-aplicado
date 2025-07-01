import styles from './Pedido.module.css';

import Button from 'react-bootstrap/Button';
import Container from '../layout/Container';
import PedidoComposition from '../orders/PedidoComposition';
import DatePicker from '../orders/DatePicker';
import Popup from '../layout/Popup';

import api from '../../services/api';

import { useNavigate } from 'react-router-dom'

import { useCarrinho } from '../../contexts/CarrinhoContext';
import { usePopup } from '../../contexts/PopupContext';
import { useState } from 'react';

function Pedido() {

    const { carrinho, total, clearCarrinho } = useCarrinho();
    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const [selectedDate, setSelectedDate] = useState('');
    const [hour, setHour] = useState(8);
    const [minute, setMinute] = useState(0);

    const navigate = useNavigate();

    const deliverDateTime = `${selectedDate}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;

    const bookOrder = () => {

        const payload = {
            orderDateTime: new Date().toISOString().slice(0, 19),
            deliverDateTime: deliverDateTime,
            orderItemList: carrinho.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };

        console.log("Payload enviado:", JSON.stringify(payload, null, 2));

        api.post('/api/v1/orders', {
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

    return (
        <>
            <Container customClass="main_container">
                <div className={styles.order_content}>
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
    )
}

export default Pedido;