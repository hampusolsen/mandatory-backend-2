import React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/actions/modal";

export default function WorkspaceEmpty() {
  const Dispatch = useDispatch();

  return (
    <div className="WorkspaceEmpty">
      <p>Empty.</p>
      <button onClick={() => Dispatch(showModal("CreateList"))}>+ ADD LIST</button>
    </div>
  );
}
