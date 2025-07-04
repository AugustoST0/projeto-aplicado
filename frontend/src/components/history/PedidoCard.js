import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function formatDate(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getStatusVariant(status) {
    switch (status) {
        case 'PENDENTE':
            return 'warning';
        case 'PREPARANDO':
            return 'info';
        case 'PRONTO':
            return 'success';
        case 'ENTREGUE':
            return 'secondary';
        default:
            return 'dark';
    }
}

function PedidoCard({ order, numeroPedido }) {
    return (
        <Card className="mb-4 shadow-sm border-0 bg-light">
            <Card.Body>
                <Card.Title>Pedido #{numeroPedido}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Status:
                    <Badge bg={getStatusVariant(order.status)} className="ms-2">
                        {order.status}
                    </Badge>
                </Card.Subtitle>

                <Card.Text>
                    <strong>Data do pedido:</strong> {formatDate(order.orderDateTime)}<br />
                    <strong>Data de entrega:</strong> {formatDate(order.deliverDateTime)}
                </Card.Text>

                <h5 className="mt-3">Itens:</h5>
                <ListGroup variant="flush">
                    {order.orderItemList.map(item => (
                        <ListGroup.Item key={item.id}>
                            {item.product.name} - {item.quantity}x - R${(item.product.price * item.quantity).toFixed(2)}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default PedidoCard;
