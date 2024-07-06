// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QuestionProvider } from "./QuestionContext";

ReactDOM.render(
  <QuestionProvider>
    <App />
  </QuestionProvider>,
  document.getElementById("root")
);
