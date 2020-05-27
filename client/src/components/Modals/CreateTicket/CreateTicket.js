import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import Modal from "../../../lib/Modal/Modal";
import Card from "../../Card/Card";
import InputField from "../../../lib/FormComponents/InputField";
import Button from "../../../lib/FormComponents/Button";
import { showModal } from "../../../store/actions/modal";
import { addTicket } from "../../../store/actions/workspace";

export default function CreateTicket({ data }) {
  const [state, setState] = useState({ title: "", description: "" });
  const Dispatch = useDispatch();

  function onChange(e) {
    const { id, value } = e.target;
    const key = id.split("-")[1];

    setState({ ...state, [key]: value });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (state.title < 3) return;

    const ticket = {
      parent_id: data.id,
      title: state.title,
      description: state.description,
      current_index: data.current_index,
    };

    axios
      .post("/api/ticket", ticket)
      .then((res) => {
        Dispatch(addTicket(res.data));
        Dispatch(showModal("Success", "Your ticket was created."));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal>
      <Card title="Create Ticket">
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
