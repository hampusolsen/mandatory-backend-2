import React from "react";
import Modal from "../../../lib/Modal/Modal";
import { useDispatch } from "react-redux";
import { hideModal } from "../../../store/actions/modal";
import Button from "../../../lib/FormComponents/Button";

export default function Unauthorized() {
  const Dispatch = useDispatch();

  return (
    <Modal>
      <main className="Unauthorized">
        <div className="Unauthorized__header">
          <div className="Unauthorized__icon" />
        </div>
        <h1 className="Unauthorized__title">Unauthorized!</h1>
        <p className="Unauthorized__content">You require admin privileges to perform this action.</p>
        <Button onClick={() => Dispatch(hideModal())}>CLOSE</Button>
      </main>
    </Modal>
  );
}
