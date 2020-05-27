import React from "react";
import { useSelector, useDispatch } from "react-redux";
import WorkspaceEmpty from "./WorkspaceEmpty";
import List from "../List/List";
import TicketMinified from "../Ticket/TicketMinified";
import { showModal } from "../../store/actions/modal";

export default function WorkspaceContent() {
  const lists = useSelector((state) => state.workspace.lists);
  const Dispatch = useDispatch();

  if (!lists.length) return <WorkspaceEmpty />;

  return (
    <div className="WorkspaceContent">
      <div className="WorkspaceContent__inner">
        {lists.map((list) => (
          <List key={list._id} list={list}>
            {list.tickets.map((ticket) => (
              <TicketMinified key={ticket._id} ticket={ticket} />
            ))}
          </List>
        ))}
        <div className="WorkspaceContent__new-list">
          <button onClick={() => Dispatch(showModal("CreateList"))}>+ ADD LIST</button>
        </div>
      </div>
    </div>
  );
}
