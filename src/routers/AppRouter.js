import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";

import theme from "../../theme";
import ConfigStore from "../redux";
import App from "../components/App";

// grab initialState from window
const state = window.__STATE__;
delete window.__STATE__;

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
