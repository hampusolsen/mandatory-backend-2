import React from "react";

const classNames = {
  text: "button--text",
  submit: "button--filled",
  outline: "button--outline",
  filled: "button--filled",
};

export default function Button({ children, onClick = null, type = "filled" }) {
  return (
    <button type={type === "submit" ? "submit" : "button"} className={`button ${classNames[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
