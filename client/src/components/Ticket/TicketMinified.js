import React from "react";
import axios from "axios";
import { deleteTicket } from "../../store/actions/workspace";
import { showModal } from "../../store/actions/modal";
import { useDispatch } from "react-redux";
import { CloseIcon, EditIcon } from "../../lib/Icons/Icons";
import { useDrag } from "react-dnd";
import ItemTypes from "../../lib/ItemTypes";

function ISO8601DateStringParser(dateString) {
  return dateString.replace("T", " ").replace(/\..*/, "");
}

export default function TicketMinified({ ticket }) {
  const Dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.TICKET,
      id: ticket._id,
      parent_id: ticket.parent_id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  function _editTicket() {
    Dispatch(showModal("EditTicket", null, ticket));
  }

  function _deleteTicket() {
    axios
      .delete(`/api/ticket/${ticket._id}`)
      .then(() => {
        Dispatch(deleteTicket(ticket._id));
        Dispatch(showModal("Success", "Your ticket was deleted."));
      })
      .catch(() => {
        Dispatch(showModal("Error", "You are missing administrational rights."));
      });
  }

  return (
    <li className="TicketMinified" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="TicketMinified__nav">
        <h4 className="TicketMinified__title">{ticket.title}</h4>
        <div className="TicketMinified__menu">
          <button className="TicketMinified__link" style={{ marginRight: 6 }} onClick={_editTicket}>
            <EditIcon />
          </button>
          <button className="TicketMinified__link" onClick={_deleteTicket}>
            <CloseIcon />
          </button>
        </div>
      </div>
      <p className="TicketMinified__desc">{ticket.description}</p>
      <span className="TicketMinified__date">{ISO8601DateStringParser(ticket.created)}</span>
    </li>
  );
}
