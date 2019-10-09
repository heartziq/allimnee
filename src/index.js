import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "babel-polyfill";

ReactDOM.hydrate(<App />, document.querySelector("#root"));
