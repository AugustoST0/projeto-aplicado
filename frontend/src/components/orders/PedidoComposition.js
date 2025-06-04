import { useCarrinho } from '../../contexts/CarrinhoContext';
import { usePopup } from '../../contexts/PopupContext';

import PedidoItem from './PedidoItem';
import Popup from '../layout/Popup';

import styles from './PedidoComposition.module.css';

function PedidoComposition() {
    const { carrinho, handleRemove } = useCarrinho();
    const { popupConfig, showCustomPopup, handleClosePopup } = usePopup();

    const openPopupToRemove = (id) => {
        showCustomPopup({
            title: 'Remover item do pedido',
            description: 'Deseja mesmo remover este item do pedido?',
            withButton: true,
            btnText: 'Remover',
            handleBtn: () => handleRemove(id),
        });
    }

    return (
        <>
            <div className={styles.items_container}>
                {carrinho.length > 0 ? (
                    carrinho.map(item => (
                        <PedidoItem
                            key={item.id}
                            item={item}
                            handleOnClick={() => openPopupToRemove(item.id)}
                        />
                    ))
                ) : (
                    <p>Seu pedido está vazio. Adicione itens do cardápio.</p>
                )}
            </div>
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

export default PedidoComposition;