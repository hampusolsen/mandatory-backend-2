import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Modal from "../../../lib/Modal/Modal";
import Card from "../../Card/Card";
import InputField from "../../../lib/FormComponents/InputField";
import Button from "../../../lib/FormComponents/Button";
import { showModal } from "../../../store/actions/modal";
import { addList } from "../../../store/actions/workspace";

export default function CreateList() {
  const { _id, lists } = useSelector((state) => state.workspace);
  const [title, setTitle] = useState("");
  const Dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    if (title.length < 3) return;

    axios
      .post(`/api/workspace/${_id}`, { title, current_index: lists.length })
      .then((res) => {
        Dispatch(addList(res.data));
        Dispatch(showModal("Success", "Your list was created."));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Modal>
      <Card title="Create List">
        <div className="CreateList">
          <form onSubmit={onSubmit}>
            <InputField label="title" id="cl-id" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button type="submit">SUBMIT</Button>
          </form>
        </div>
      </Card>
    </Modal>
  );
}
