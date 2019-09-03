import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import App from "./src/components/App";
import { StaticRouter } from "react-router";
import theme from "./theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import ConfigStore from "./src/redux";
import { Provider } from "react-redux";

// set initialState
const initialState = { count: 100 };
const store = ConfigStore(initialState);

// Overall HTML layout
function renderFullPage(html, css, store) {
  /* ... */
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>My page</title>
      <style id="jss-server-side">${css}</style>
      <script type="text/javascript" src="/bundle.js" defer></script>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__STATE__ = ${JSON.stringify(store.getState())}
      </script>
    </body>
  </html>
`;
}

export const handleRender = (request, h) => {
  const sheets = new ServerStyleSheets();
  const context = {
    isServer: true
  };
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <StaticRouter location={''} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </ThemeProvider>
    )
  );

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  return renderFullPage(html, css, store);
};

export const serverRender = (request) => {
  const markup = handleRender();

  return {
    initialRender: markup,
    initialState: store.getState(),
  };
};
