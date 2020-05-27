import {
  INIT_WORKSPACE,
  ADD_LIST,
  ADD_TICKET,
  POPULATE_WORKSPACE,
  RESET_WORKSPACE,
  DELETE_TICKET,
  DELETE_LIST,
  MOVE_TICKET,
  EDIT_TICKET,
} from "../actions/workspace";
import { toLocalStorage, removeLocalStorage } from "../../lib/utils";

const initialState = {
  title: "",
  _id: "",
  lists: [],
};

export default function WorkspaceReducer(state = initialState, { type, payload }) {
  let patchedState;

  switch (type) {
    case INIT_WORKSPACE:
      toLocalStorage("workspace", payload);
      patchedState = { ...state, ...payload };
      return patchedState;

    case POPULATE_WORKSPACE:
      patchedState = { ...state, lists: payload };
      return patchedState;

    case ADD_LIST:
      patchedState = { ...state, lists: [...state.lists, payload] };
      return patchedState;

    case DELETE_LIST: {
      const lists = [...state.lists].filter(({ _id }) => _id !== payload);

      patchedState = { ...state, lists };
      return patchedState;
    }

    case ADD_TICKET: {
      const lists = [...state.lists];
      const listIdx = lists.findIndex(({ _id }) => _id === payload.parent_id);
      if (listIdx < 0) return state;

      lists[listIdx].tickets.push(payload);

      patchedState = { ...state, lists };
      return patchedState;
    }

    case DELETE_TICKET: {
      const lists = [...state.lists].map((list) => {
        const ticketIdx = list.tickets.findIndex(({ _id }) => _id === payload);
        if (ticketIdx >= 0) list.tickets.splice(ticketIdx, 1);
        return list;
      });

      patchedState = { ...state, lists };
      return patchedState;
    }

    case EDIT_TICKET: {
      const lists = state.lists.map((list) =>
        list._id === payload.parent_id
          ? {
              ...list,
              tickets: list.tickets.map((ticket) => (ticket.id === payload.id ? payload : ticket)),
            }
          : list
      );

      patchedState = { ...state, lists };
      return patchedState;
    }

    case MOVE_TICKET: {
      const { id, oldParentId, newParentId } = payload;
      let oldParent, newParent, ticket;

      state.lists.forEach((list) => {
        if (list._id === oldParentId) {
          ticket = list.tickets.splice(
            list.tickets.findIndex(({ _id }) => _id === id),
            1
          )[0];
          oldParent = { ...list };
        }

        if (list._id === newParentId) newParent = { ...list };
      });

      ticket.parent_id = newParentId;
      newParent.tickets.push(ticket);

      const lists = state.lists.map((list) => {
        if (list._id === oldParentId) return oldParent;
        if (list._id === newParentId) return newParent;
        return list;
      });

      patchedState = { ...state, lists };
      return patchedState;
    }

    case RESET_WORKSPACE:
      removeLocalStorage("workspace");
      return initialState;

    default:
      return state;
  }
}
