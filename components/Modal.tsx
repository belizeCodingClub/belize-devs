import React, { ReactNode } from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
  },
};

ReactModal.setAppElement("#__next");

export default function Modal({
  children,
  modalIsOpen,
  setIsOpen,
}: {
  children: ReactNode;
  modalIsOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {children}
      </ReactModal>
    </div>
  );
}
