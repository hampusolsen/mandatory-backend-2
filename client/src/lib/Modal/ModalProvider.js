import React from "react";
import { useSelector } from "react-redux";

import CreateList from "../../components/Modals/CreateList/CreateList";
import CreateTicket from "../../components/Modals/CreateTicket/CreateTicket";
import CreateWorkspace from "../../components/Modals/CreateWorkspace/CreateWorkspace";
import EditTicket from "../../components/Modals/EditTicket/EditTicket";
import Success from "../../components/Modals/Success/Success";
import Unauthorized from "../../components/Modals/Unauthorized/Unauthorized";

const MODAL_COMPONENTS = {
  CreateList,
  CreateTicket,
  CreateWorkspace,
  EditTicket,
  Success,
  Unauthorized,
};

export default function ModalProvider({ children }) {
  const modal = useSelector((state) => state.modal);
  const SelectedModal = MODAL_COMPONENTS[modal.name];

  return (
    <>
      {children}
      {modal.name && <SelectedModal message={modal.message} data={modal.data} />}
    </>
  );
}
