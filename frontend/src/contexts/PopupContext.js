import { createContext } from "react";
import { useState, useContext } from 'react';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState({ title: '', description: '' });

    const handleShowPopup = (title, description) => {
        setPopupData({ title, description });
        setShowPopup(true);
    };

    const handleClosePopup = () => setShowPopup(false);

    return (
        <PopupContext.Provider value={{ showPopup, popupData, handleShowPopup, handleClosePopup }}>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopup = () => useContext(PopupContext);