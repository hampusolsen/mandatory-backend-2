import { SHOW_MODAL, HIDE_MODAL } from "../actions/modal";

const initialState = { name: "", message: "" };

export default function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return action.payload;
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
