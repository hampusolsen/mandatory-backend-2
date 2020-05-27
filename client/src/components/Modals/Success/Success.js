import React from "react";
import Modal from "../../../lib/Modal/Modal";
import Button from "../../../lib/FormComponents/Button";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../store/actions/modal";

export default function Success({ message }) {
  const Dispatch = useDispatch();

  return (
    <Modal>
      <main className="Success" onClick={(e) => e.stopPropagation()}>
        <div className="Success__header">
          <div className="Success__icon" />
        </div>
        <h1 className="Success__title">Success!</h1>
        <p className="Success__content">{message}</p>
        <Button onClick={() => Dispatch(hideModal())}>CLOSE</Button>
      </main>
    </Modal>
  );
}
