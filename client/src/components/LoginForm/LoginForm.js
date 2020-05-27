import React, { useReducer } from "react";
import { validateForm } from "./helpers";
import { reducer, initialState } from "./reducer";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initUser } from "../../store/actions/user";

export default function LoginForm() {
  const [{ user, errors, submitted }, dispatch] = useReducer(reducer, initialState);
  const Dispatch = useDispatch();

  function onChange(e) {
    const { value, id } = e.target;
    const key = id.split("-")[1];

    dispatch({ type: "CHANGE_FORM_VALUE", payload: { [key]: value } });
  }

  function onSubmit(e) {
    e.preventDefault();

    const errors = validateForm(user);
    if (errors) {
      return dispatch({ type: "HANDLE_FORM_ERRORS", payload: errors });
    }

    axios
      .post("/api/user/login/", user)
      .then((res) => {
        Dispatch(initUser(res.data));
        dispatch({ type: "HANDLE_REDIRECT" });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      {submitted && <Redirect to="/client" />}
      <form className="LoginForm" onSubmit={onSubmit}>
        <div className="LoginForm__field">
          <label htmlFor="login-email">E-mail</label>
          <input type="email" id="login-email" onChange={onChange} value={user.email} />
          {errors.email && <span className="LoginForm__field-error">{errors.email}</span>}
        </div>
        <div className="LoginForm__field">
          <label htmlFor="Password">Password</label>
          <input type="password" id="login-password" onChange={onChange} value={user.password} />
          {errors.password && <span className="LoginForm__field-error">{errors.password}</span>}
        </div>
        <button type="submit" className="button LoginForm__submit-button">
          SUBMIT
        </button>
      </form>
    </>
  );
}
