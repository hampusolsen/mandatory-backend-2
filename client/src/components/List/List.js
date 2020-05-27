import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/actions/modal";
import { CloseIcon } from "../../lib/Icons/Icons";
import axios from "axios";
import { deleteList, moveTicket } from "../../store/actions/workspace";
import { useDrop } from "react-dnd";
import ItemTypes from "../../lib/ItemTypes";

export default function List({ children, onDrop, list }) {
  const Dispatch = useDispatch();
  const { pathname } = useLocation();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TICKET,
    drop: (item, monitor) => {
      axios
        .patch(`/api/ticket/${item.id}`, { parent_id: list._id })
        .then(() => Dispatch(moveTicket(item.id, item.parent_id, list._id)))
        .catch((err) => console.log(err));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  function _deleteList() {
    const workspaceId = pathname.split("/")[2];

    axios
      .delete(`/api/workspace/${workspaceId}/${list._id}`)
      .then(() => {
        Dispatch(showModal("Success", "Your list was deleted."));
        Dispatch(deleteList(list._id));
      })
      .catch(() => {
        Dispatch(showModal("Unauthorized"));
      });
  }

  return (
    <div className="List" ref={drop} style={{ backgroundColor: isOver ? "#333" : null }}>
      <div className="List__header">
        <h3 className="List__title">{list.title}</h3>
        <button onClick={_deleteList}>
          <CloseIcon />
        </button>
      </div>
      <ul className="List__tickets">{children}</ul>
      <button className="List__button" onClick={() => Dispatch(showModal("CreateTicket", null, { id: list._id, current_index: list.current_index }))}>
        + ADD TICKET
      </button>
    </div>
  );
}
