export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export const showModal = (name, message = "", data = {}) => {
  return {
    type: SHOW_MODAL,
    payload: { name, message, data },
  };
};

export const hideModal = () => ({ type: HIDE_MODAL });
