import React from "react";
import { Link } from "react-router-dom";
import { WorkspaceIcon, ArrowRightIcon, KeyIcon, PlusIcon } from "../../lib/Icons/Icons";
import WorkspaceHeaderNav from "./WorkspaceHeaderNav";
import WorkspaceHeaderNavList from "./WorkspaceHeaderNavList";
import WorkspaceHeaderNavListItem from "./WorkspaceHeaderNavListItem";
import { useDispatch } from "react-redux";
import { resetWorkspace } from "../../store/actions/workspace";
import { showModal } from "../../store/actions/modal";

export default function WorkspaceHeader() {
  const Dispatch = useDispatch();

  return (
    <header className="WorkspaceHeader">
      <WorkspaceHeaderNav>
        <WorkspaceHeaderNavList>
          <WorkspaceHeaderNavListItem>
            <WorkspaceIcon />
          </WorkspaceHeaderNavListItem>
        </WorkspaceHeaderNavList>
      </WorkspaceHeaderNav>
      <div className="WorkspaceHeader__logo">
        <span>mello</span>
      </div>
      <WorkspaceHeaderNav>
        <WorkspaceHeaderNavList>
          <WorkspaceHeaderNavListItem>
            <button onClick={() => Dispatch(showModal("CreateList"))}>
              <PlusIcon />
            </button>
          </WorkspaceHeaderNavListItem>
          <WorkspaceHeaderNavListItem>
            <KeyIcon />
          </WorkspaceHeaderNavListItem>
          <WorkspaceHeaderNavListItem>
            <Link to="/client" onClick={() => Dispatch(resetWorkspace())}>
              <ArrowRightIcon />
            </Link>
          </WorkspaceHeaderNavListItem>
        </WorkspaceHeaderNavList>
      </WorkspaceHeaderNav>
    </header>
  );
}
