import React, { useState } from "react";

import { capitalize } from "../../lib/utils";

import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Button from "../../lib/FormComponents/Button";

export default function Landing() {
  const [type, setType] = useState("login");

  return (
    <>
      <div className="Landing">
        <div className="Landing__background">
          <div className="Landing__background-box"></div>
          <div className="Landing__background-box"></div>
          <div className="Landing__background-box"></div>
          <div className="Landing__background-box"></div>
          <div className="Landing__background-box"></div>
          <div className="Landing__background-box"></div>
          <div className="Landing__background-box"></div>
          <div className="Landing__background-box"></div>
          <div className="Landing__background-box"></div>
        </div>
        <div className="Landing__form-container">
          <h1 className="Landing__form-title">{capitalize(type)}</h1>
          {type === "login" ? <LoginForm /> : <RegistrationForm setType={() => setType("login")} />}
          <Button onClick={() => setType(type === "login" ? "registration" : "login")}>{type === "login" ? "Registration" : "Login"}</Button>
        </div>
      </div>
    </>
  );
}
