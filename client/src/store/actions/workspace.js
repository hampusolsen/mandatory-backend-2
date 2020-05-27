export const INIT_WORKSPACE = "INIT_WORKSPACE";
export const POPULATE_WORKSPACE = "POPULATE_WORKSPACE";
export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const EDIT_TICKET = "EDIT_TICKET";
export const ADD_TICKET = "ADD_TICKET";
export const DELETE_TICKET = "DELETE_TICKET";
export const RESET_WORKSPACE = "RESET_WORKSPACE";
export const MOVE_TICKET = "MOVE_TICKET";

export function initWorkspace(workspaceMinified) {
  return { type: INIT_WORKSPACE, payload: workspaceMinified };
}

export function populateWorkspace(populatedLists) {
  return { type: POPULATE_WORKSPACE, payload: populatedLists };
}

export function addList(list) {
  return { type: ADD_LIST, payload: list };
}

export function deleteList(listId) {
  return { type: DELETE_LIST, payload: listId };
}

export function addTicket(ticket) {
  return { type: ADD_TICKET, payload: ticket };
}

export function deleteTicket(ticketId) {
  return { type: DELETE_TICKET, payload: ticketId };
}

export function editTicket(ticket) {
  return { type: EDIT_TICKET, payload: ticket };
}

export function resetWorkspace() {
  return { type: RESET_WORKSPACE };
}

export function moveTicket(id, oldParentId, newParentId) {
  return { type: MOVE_TICKET, payload: { id, oldParentId, newParentId } };
}
