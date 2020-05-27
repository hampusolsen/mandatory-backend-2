import React from "react";
import { useSelector } from "react-redux";
import WorkspaceContent from "./WorkspaceContent";
import WorkspaceContentHeader from "./WorkspaceContentHeader";

export default function WorkspaceContentContainer() {
  const workspace = useSelector((state) => state.workspace);

  return (
    <main className="WorkspaceContentContainer">
      <WorkspaceContentHeader title={workspace.title} />
      <WorkspaceContent />
    </main>
  );
}
