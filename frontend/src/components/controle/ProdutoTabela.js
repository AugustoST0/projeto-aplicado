import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function ProdutoTabela({ produtos, onEdit, onDeleteConfirm }) {
    return (
        <div className="table-responsive w-100">
            <Table striped bordered hover responsive="md">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.name}</td>
                            <td>{produto.description}</td>
                            <td>
                                R${typeof produto.price === 'number'
                                    ? produto.price.toFixed(2).replace('.', ',')
                                    : '0,00'}
                            </td>
                            <td>{produto.category.charAt(0) + produto.category.slice(1).toLowerCase()}</td>
                            <td>
                                <div className="d-flex flex-wrap gap-3">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(produto)}
                                    >Editar</Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => onDeleteConfirm(produto.id, produto.name)}
                                    >Deletar</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProdutoTabela;
