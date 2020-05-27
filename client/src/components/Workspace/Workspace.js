import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WorkspaceHeader from "../WorkspaceHeader/WorkspaceHeader";
import WorkspaceContentContainer from "./WorkspaceContentContainer";
import { useDispatch } from "react-redux";
import { populateWorkspace } from "../../store/actions/workspace";

export default function Workspace() {
  const { workspaceId } = useParams();
  const [loading, setLoading] = useState(true);
  const Dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/workspace/${workspaceId}/`)
      .then((res) => {
        Dispatch(populateWorkspace(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [workspaceId, Dispatch]);

  return loading ? (
    <div className="Loading" />
  ) : (
    <div className="Workspace">
      <WorkspaceHeader />
      <WorkspaceContentContainer />
    </div>
  );
}
