import React from "react";

export default function InputField({ type = "text", label, id, value, onChange, error = "", placeholder = "" }) {
  return (
    <div className="form--input">
      <label className="form--input__label" htmlFor={id}>
        {label}
      </label>
      <input className="form--input__field" type={type} id={id} value={value} onChange={onChange} autoComplete="off" placeholder={placeholder} />
      <span className="form--input__error">{error}</span>
    </div>
  );
}
