const initialState = {
  user: {
    email: "",
    password: "",
  },
  errors: {
    email: null,
    password: null,
  },
  submitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_FORM_VALUE":
      const user = {
        ...state.user,
        ...action.payload,
      };

      return { ...state, user };
    case "HANDLE_FORM_ERRORS":
      return { ...state, errors: action.payload };
    case "HANDLE_REDIRECT":
      return { ...state, submitted: true };
    default:
      return state;
  }
}

export { reducer, initialState };
