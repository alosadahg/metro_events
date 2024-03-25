import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    content: "",
  });

  return (
    <ModalContext.Provider value={[modalState, setModalState]}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
