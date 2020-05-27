import { INIT_USER, SIGNOUT, ADD_WORKSPACE } from "../actions/user";
import { removeLocalStorage, toLocalStorage } from "../../lib/utils";

const initialState = {
  first_name: "",
  last_name: "",
  full_name: "",
  email: "",
  workspaces_joined: [],
  items_owned: [],
};

export default function UserReducer(state = initialState, { type, payload }) {
  let patchedState;

  switch (type) {
    case INIT_USER:
      patchedState = payload;
      toLocalStorage("user", patchedState);
      return patchedState;

    case SIGNOUT:
      removeLocalStorage("user");
      return initialState;

    case ADD_WORKSPACE:
      const workspaces_joined = [...state.workspaces_joined, payload];
      patchedState = { ...state, workspaces_joined };
      toLocalStorage("user", patchedState);
      return { ...state, workspaces_joined };

    default:
      return state;
  }
}
