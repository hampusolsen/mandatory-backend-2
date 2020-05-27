function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_FORM_VALUE":
      return { ...state, ...action.payload };
    case "HANDLE_FORM_ERRORS":
      return { ...state, errors: action.payload };
    case "HANDLE_REDIRECT":
      return { ...state, submitted: true };
    default:
      return state;
  }
}

export { reducer };
