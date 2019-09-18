import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import { StaticRouter } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";

import ConfigStore from "./src/redux";
import App from "./src/components/App";
import theme from "./theme";

export const serverRender = (request, initialState = {}) => {
  // set initialState and initialize store
  const store = ConfigStore(initialState);

  const sheets = new ServerStyleSheets();
  const context = {
    isServer: true
  };

  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <StaticRouter location={request.url.pathname} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </ThemeProvider>
    )
  );

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  return {
    cssData: css,
    htmlData: html,
    initialState: store.getState()
  };
};
