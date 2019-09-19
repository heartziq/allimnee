import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import fetch from "isomorphic-fetch";

import theme from "../../theme";
import ConfigStore from "../redux";
import App from "../components/App";

// grab initialState from window
let state = window.__STATE__;
delete window.__STATE__;

const fetchInitialTutorState = async () => {
  const result = await fetch("/api/tutor");
  const tutorList = await result.json();
  

  const newState = {...state, tutor: tutorList};

  console.log(`state (FE): ${JSON.stringify(state)}`)

  return newState;
};

console.log(`AppRouter > state: ${JSON.stringify(state.tutor.length < 1)}`);
if (state.tutor.length < 1) {
  console.log("state.tutor is [], calling api/tutor...");
  // fetch("/api/tutor")
  //   .then(result => result.json())
  //   .then(data => {
  //     // console.log(`data: ${JSON.stringify(data)}`);
  //     state = data;
  //     console.log(`state: ${JSON.stringify(state)}`);
  //   })
  //   .catch(err => console.error(err.stack));
  // state = (async () => await fetchInitialTutorState())();
}

// initialize store (Client Side)
const store = ConfigStore(state);

function AppRouter() {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default AppRouter;
