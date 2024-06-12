import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [lgShow, setLgShow] = useState(false);

  const handleShow = () => setLgShow(true);
  const handleClose = () => setLgShow(false);

  return (
    <ModalContext.Provider value={{ lgShow, handleShow, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
