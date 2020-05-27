import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fromLocalStorage } from "../utils";
import { initUser } from "../../store/actions/user";

export default function Validator({ children }) {
  const [redirect, setRedirect] = useState(false);
  const Dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    if (!email) {
      if (!fromLocalStorage("user")) setRedirect(true);
      else Dispatch(initUser(fromLocalStorage("user")));
    }
  }, [email, Dispatch]);

  return (
    <>
      {redirect && <Redirect to="/" />}
      {(email || redirect) && children}
    </>
  );
}
