const filterd = (todos, filters) => {
  return todos.filter(todo => {
    return filters.completed === true && todo.completed === true;
  });
};

export default filterd;
