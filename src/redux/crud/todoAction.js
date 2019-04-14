import moment from "moment";
import uuid from "uuid";

export const AddTodo = ({
  completed = false,
  time = moment().format("D/M , H:mm A"),
  title = "",
  desc = "",
  id = uuid()
} = {}) => ({
  type: "ADD_TODO",
  todo: {
    completed,
    time,
    title,
    desc,
    id
  }
});

export const deleteTodo = id => ({
  type: "DELETE_TODO",
  id
});

export const updateTodo = update => ({
  type: "UPDATE_TODO",
  update
});
