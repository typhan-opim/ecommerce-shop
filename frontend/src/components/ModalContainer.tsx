import React from "react";
import { useModal } from "@/context/ModalContext";
import { CommonModal } from "@/common/modal";

const ModalContainer: React.FC = () => {
  const { modals, closeModal } = useModal();

  return (
    <>
      {modals.map((modal) => (
        <CommonModal
          key={modal.id}
          message={modal.message || ""}
          redirect={modal.redirect}
          onClose={() => closeModal(modal.id)}
        />
      ))}
    </>
  );
};

export default ModalContainer;
