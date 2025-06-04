import { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [popupConfig, setPopupConfig] = useState({
        title: '',
        description: '',
        show: false,
        withButton: false,
        btnText: '',
        handleBtn: null,
    })

    const showCustomPopup = ({
        title,
        description,
        withButton = false,
        btnText = '',
        handleBtn = null
    }) => {
        setPopupConfig({
            title,
            description,
            show: true,
            withButton,
            btnText,
            handleBtn
        })
    }

    const handleClosePopup = () => {
        setPopupConfig(prev => ({ ...prev, show: false }));
    };

    return (
        <PopupContext.Provider 
            value={{ popupConfig, showCustomPopup, handleClosePopup }}
        >
            {children}
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
