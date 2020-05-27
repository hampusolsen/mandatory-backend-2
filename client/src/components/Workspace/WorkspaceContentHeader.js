import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initWorkspace } from "../../store/actions/workspace";
import { fromLocalStorage } from "../../lib/utils";

export default function WorkspaceContentHeader({ title }) {
  const Dispatch = useDispatch();

  useEffect(() => {
    if (!title) Dispatch(initWorkspace(fromLocalStorage("workspace")));
  }, [title, Dispatch]);

  return (
    <div className="WorkspaceContentHeader">
      <h1># {title}</h1>
    </div>
  );
}
