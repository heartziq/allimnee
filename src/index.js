import React from "react";
import ReactDOM from "react-dom";
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import App from "./App";

ReactDOM.hydrate(<App />, document.querySelector("#root"));
