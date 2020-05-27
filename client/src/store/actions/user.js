/** Action Types */
export const INIT_USER = "INIT_USER";
export const SIGNOUT = "SIGNOUT";
export const ADD_WORKSPACE = "ADD_WORKSPACE";

/** Action Creators */
export const initUser = (user) => ({
  type: INIT_USER,
  payload: user,
});

export const destroyUser = () => ({
  type: SIGNOUT,
});

export const addWorkspace = ({ title, _id }) => ({
  type: ADD_WORKSPACE,
  payload: { title, _id },
});
