import { combineReducers } from "redux";

import modal from "./modal";
import user from "./user";
import workspace from "./workspace";

export default combineReducers({
  modal,
  user,
  workspace,
});
