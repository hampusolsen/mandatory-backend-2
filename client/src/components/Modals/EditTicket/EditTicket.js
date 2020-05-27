import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import Modal from "../../../lib/Modal/Modal";
import Card from "../../Card/Card";
import InputField from "../../../lib/FormComponents/InputField";
import Button from "../../../lib/FormComponents/Button";
import { showModal } from "../../../store/actions/modal";
import { editTicket } from "../../../store/actions/workspace";

export default function CreateTicket({ data }) {
  const [state, setState] = useState({ title: data.title, description: data.description });
  const Dispatch = useDispatch();

  function onChange(e) {
    const { id, value } = e.target;
    const key = id.split("-")[1];

    setState({ ...state, [key]: value });
  }

  function onSubmit(e) {
    e.preventDefault();

    const ticket = {
      ...data,
      title: state.title,
      description: state.description,
    };

    axios
      .patch(`/api/ticket/${ticket._id}`, ticket)
      .then((res) => {
        Dispatch(editTicket(res.data));
        Dispatch(showModal("Success", "Your ticket was edited."));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal>
      <Card title="Edit Ticket">
        <div className="CreateTicket">
          <form onSubmit={onSubmit}>
            <InputField label="title" id="ct-title" value={state.title} onChange={onChange} />
            <InputField label="description" id="ct-description" value={state.description} onChange={onChange} />
            <Button type="submit">SUBMIT</Button>
          </form>
        </div>
      </Card>
    </Modal>
  );
}
