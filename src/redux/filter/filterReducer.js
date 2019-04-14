const initialState = {
  completed: false
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case "COMPLETED":
      state.completed = actions.completed;
      return state;
    default:
      return state;
  }
};
