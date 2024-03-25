import React, { useContext, useState } from "react";
import OrganizerRequestModal from "./OrganizerRequestModal";
import { ModalContext } from "../../Context/ModalContext";

const Modal = () => {
  const [modalState, setModalState] = useContext(ModalContext);

  return (
    <div
      className="Modal"
      style={{ visibility: `${modalState.open ? "visible" : "hidden"}` }}
    >
      <OrganizerRequestModal />
      <div
        className="overlay"
        onClick={() => setModalState({ ...modalState, open: false })}
      />
    </div>
  );
};

export default Modal;
