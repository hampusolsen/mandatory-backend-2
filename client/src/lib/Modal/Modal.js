import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { hideModal } from "../../store/actions/modal";

export default function Modal({ children }) {
  const Dispatch = useDispatch();

  return createPortal(
    <div className="Modal" onClick={() => Dispatch(hideModal())}>
      {children}
    </div>,
    document.getElementById("root")
  );
}
