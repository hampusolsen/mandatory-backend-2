import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { reducer } from "./reducer";
import { validateForm } from "./helpers";
import { toLocalStorage } from "../../lib/utils";
import { useDispatch } from "react-redux";
import { initUser } from "../../store/actions/user";
import { showModal } from "../../store/actions/modal";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmed: "",
  errors: {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    password_confirmed: null,
  },
  submitted: false,
};

export default function Registration({ setType }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const Dispatch = useDispatch();

  function onChange(e) {
    const key = e.target.id.split("-")[1];
    const value = e.target.value;

    dispatch({ type: "CHANGE_FORM_VALUE", payload: { [key]: value } });
  }

  function onSubmit(e) {
    e.preventDefault();

    const errors = validateForm(state);
    if (errors) {
      return dispatch({ type: "HANDLE_FORM_ERRORS", payload: errors });
    }

    const user = { ...state };
    delete user.errors;

    axios
      .post("/api/user/register", user)
      .then((res) => {
        toLocalStorage("user", res.data);
        Dispatch(initUser(res.data));
        Dispatch(showModal("Success", "Your account was created."));
        setType();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      {state.submitted && <Redirect to="/" />}
      <form className="RegistrationForm" onSubmit={onSubmit}>
        <div className="RegistrationForm__field">
          <label htmlFor="registration-first_name">First Name</label>
          <input type="text" id="registration-first_name" onChange={onChange} value={state.first_name} placeholder="Jean" />
          {state.errors.first_name && <span className="RegistrationForm__field-error">{state.errors.first_name}</span>}
        </div>
        <div className="RegistrationForm__field">
          <label htmlFor="registration-last_name">Last Name</label>
          <input type="text" id="registration-last_name" onChange={onChange} value={state.last_name} placeholder="Michel" />
          {state.errors.last_name && <span className="RegistrationForm__field-error">{state.errors.last_name}</span>}
        </div>
        <div className="RegistrationForm__field">
          <label htmlFor="registration-email">E-mail</label>
          <input type="email" id="registration-email" onChange={onChange} value={state.email} placeholder="jean.michel@mail.com" />
          {state.errors.email && <span className="RegistrationForm__field-error">{state.errors.email}</span>}
        </div>
        <div className="RegistrationForm__field">
          <label htmlFor="registration-password">Password</label>
          <input type="password" id="registration-password" onChange={onChange} value={state.password} />
          <div className="RegistrationForm__field-info"></div>
          {state.errors.password && <span className="RegistrationForm__field-error">{state.errors.password}</span>}
        </div>
        <div className="RegistrationForm__field">
          <label htmlFor="registration-password_confirmed">Confirm Password</label>
          <input type="password" id="registration-password_confirmed" onChange={onChange} value={state.password_confirmed} />
          {state.errors.password_confirmed && <span className="RegistrationForm__field-error">{state.errors.password_confirmed}</span>}
        </div>
        <button type="submit" className="button RegistrationForm__submit-button">
          SUBMIT
        </button>
      </form>
    </>
  );
}
