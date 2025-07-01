import PedidoCard from '../history/PedidoCard';

import { useState, useEffect } from 'react';

import api from '../../services/api';

function HistoricoComposition() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get('/api/v1/orders/porUser')
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            {orders.length === 0 ? (
                <p>Você não fez nenhum pedido.</p>
            ) : (
                orders.map((order, index) => (
                    <PedidoCard
                        key={order.id}
                        order={order}
                        numeroPedido={index + 1}
                    />
                ))
            )}
        </div>
    )
}

export default HistoricoComposition;