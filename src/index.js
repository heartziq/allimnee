import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import 'babel-polyfill';

ReactDOM.hydrate(<AppRouter />, document.querySelector("#root"));
