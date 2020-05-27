import React, { useState } from "react";
import Modal from "../../../lib/Modal/Modal";
import Card from "../../Card/Card";
import axios from "axios";
import { PasswordRegExp, WorkspaceRegExp } from "../../../lib/regexp";
import InputField from "../../../lib/FormComponents/InputField";
import Button from "../../../lib/FormComponents/Button";
import { hideModal, showModal } from "../../../store/actions/modal";
import { useDispatch, useSelector } from "react-redux";
import { addWorkspace } from "../../../store/actions/user";

const initialState = {
  values: {
    title: "",
    password: "",
    password_confirmed: "",
  },
  errors: {
    title: "",
    password: "",
    password_confirmed: "",
  },
};

function validateForm({ title, password_confirmed, password }) {
  let found = false;
  const errors = {
    title: "",
    password: "",
    password_confirmed: "",
  };

  if (!WorkspaceRegExp.test(title)) errors.title = "Title must be 3-21 characters long. No special characters.";
  if (!PasswordRegExp.test(password)) errors.password = "At least 6 characters. No special characters except !?-_.,";
  if (password !== password_confirmed) errors.password_confirmed = "Must be same as password.";

  for (const key in errors) {
    if (found === true) break;
    if (errors[key]) found = true;
  }

  return found ? errors : false;
}

export default function CreateWorkspace() {
  const userId = useSelector((state) => state.user._id);
  const [state, setState] = useState(initialState);
  const Dispatch = useDispatch();

  function onChange(e) {
    const { value, id } = e.target;
    const key = id.split("-").pop();

    setState((state) => ({ ...state, values: { ...state.values, [key]: value } }));
  }

  function onSubmit(e) {
    e.preventDefault();

    const errorsFound = validateForm(state.values);
    if (errorsFound) return setState((state) => ({ ...state, errors: errorsFound }));

    const { title, password } = state.values;
    axios
      .post("/api/workspace/", { title, password, userId })
      .then((res) => {
        Dispatch(showModal("Success", "Your workspace was created."));
        Dispatch(addWorkspace(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Modal>
      <Card title="Create Workspace">
        <div className="CreateWorkspace">
          <form className="CreateWorkspace__form" onSubmit={onSubmit}>
            <InputField label="Name" id="cws-title" value={state.values.title} onChange={onChange} error={state.errors.title} />
            <InputField type="password" label="Password" id="cws-password" value={state.values.password} onChange={onChange} error={state.errors.password} />
            <InputField
              type="password"
              label="Confirm Password"
              id="cws-password_confirmed"
              value={state.values.password_confirmed}
              onChange={onChange}
              error={state.errors.password_confirmed}
            />
            <div className="CreateWorkspace__buttons">
              <Button type="submit">SUBMIT</Button>
              <Button type="text" onClick={() => Dispatch(hideModal())}>
                CANCEL
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Modal>
  );
}
