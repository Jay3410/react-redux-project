export default (state = [], actions) => {
  switch (actions.type) {
    case "ADD_TODO":
      return [...state, actions.todo];
    case "DELETE_TODO":
      return state.filter(todo => {
        return todo.id !== actions.id;
      });
    case "UPDATE_TODO":
      const unChange = state.filter(todo => {
        return todo.id !== actions.update.id;
      });

      const change = state.filter(todo => {
        return todo.id === actions.update.id;
      });

      const update = { ...change[0], ...actions.update };

      return [...unChange, update];

    default:
      return state;
  }
};
