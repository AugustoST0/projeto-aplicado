import { useState, useEffect, createContext, useContext } from 'react';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {

    class OrderItem {
        constructor(product, quantity) {
            this.id = product.id;
            this.name = product.name;
            this.price = product.price;
            this.quantity = quantity;
        }
    }

    const [carrinho, setCarrinho] = useState(() => {
        const stored = localStorage.getItem('items');
        return stored ? JSON.parse(stored) : [];
    });

    const total = carrinho.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(carrinho));
    }, [carrinho])

    const handleAdd = (product, quantity) => {
        setCarrinho(prev => {
            const itemExistente = prev.find(item => item.id === product.id);

            if (itemExistente) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prev, new OrderItem(product, quantity)];
            }
        });
    };

    const handleRemove = (id) => {
        setCarrinho(prev => prev.filter(item => item.id !== id));
    }

    const clearCarrinho = () => {
        setCarrinho([]);
    }

    return (
        <CarrinhoContext.Provider value={{ carrinho, total, handleAdd, handleRemove, clearCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinho = () => useContext(CarrinhoContext);