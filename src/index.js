import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { Provider } from "react-redux";
import "./styles.css";

import store from "./redux/combainReducer";

function Container() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);
