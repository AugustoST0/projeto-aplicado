import PedidoCard from '../history/PedidoCard';
import { useState, useEffect } from 'react';
import api from '../../services/api';

function HistoricoComposition({ currFilter }) {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        api.get('/api/v1/orders/porUser')
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => console.error(err))
    }, []);

    useEffect(() => {
        setFilteredOrders(currFilter
            ? orders.filter(order => order.status?.toUpperCase() === currFilter)
            : orders
        );
    }, [orders, currFilter]);

    return (
        <div>
            {filteredOrders.length === 0 ? (
                <p>Não há nenhum pedido{currFilter ? ` ${currFilter.toLowerCase()}` : ''}.</p>
            ) : (
                filteredOrders.map((order, index) => (
                    <PedidoCard
                        key={order.id}
                        order={order}
                        numeroPedido={index + 1}
                    />
                ))
            )}
        </div>
    );
}

export default HistoricoComposition;
