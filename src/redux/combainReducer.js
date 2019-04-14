import todoReducer from "./crud/todoReducer";
import filterReducer from "./filter/filterReducer";

import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({
    todoReducer,
    filterReducer
  })
);

export default store;
