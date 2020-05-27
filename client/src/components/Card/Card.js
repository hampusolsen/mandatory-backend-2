import React from "react";

export default function Card({ children, title }) {
  return (
    <div className="Card" onClick={(e) => e.stopPropagation()}>
      <div className="Card__header">
        <h1 className="Card__title">{title}</h1>
      </div>
      {children}
      <div className="Card__footer"></div>
    </div>
  );
}
