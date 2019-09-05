import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import App from "./src/components/App";
import { StaticRouter } from "react-router";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import ConfigStore from "./src/redux";
import { Provider } from "react-redux";

// set initialState and initialize store
const initialState = { count: 100 };
const store = ConfigStore(initialState);

export const serverRender = request => {
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
    initialState: store.getState(),
  };
};
