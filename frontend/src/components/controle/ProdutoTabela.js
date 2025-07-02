import styles from './ProdutoTabela.module.css';

import ControlButton from './ControlButton';

function ProdutoTabela({ produtos, onEdit, onDeleteConfirm }) {
    return (
        <div className={styles.table_container}>
            <table className={styles.produtos_table}>
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
                            <td>R${produto.price}</td>
                            <td>{produto.category.charAt(0) + produto.category.slice(1).toLowerCase()}</td>
                            <td>
                                <ControlButton variant="action_button" handleClick={() => onEdit(produto)} text="Editar" />
                                <ControlButton variant="btnDanger" handleClick={() => onDeleteConfirm(produto.id, produto.name)} text="Deletar" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProdutoTabela;
