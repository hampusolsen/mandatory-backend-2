import React, { useState, useEffect } from "react";
import { currentTime } from "./helpers";

export default function Clock() {
  const [{ hr, min, date, day }, setTime] = useState({ hr: 0, min: 0, date: "", day: "" });

  useEffect(() => {
    currentTime(setTime);
  }, []);

  return (
    <div className="Clock">
      <span className="Clock__time">
        {hr}:{min}
      </span>
      <div className="Clock__details">
        <span>{date}</span>
        <span>{day}</span>
      </div>
    </div>
  );
}
