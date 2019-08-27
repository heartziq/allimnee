import axios from "axios";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import App from "./src/components/App";
import theme from "./theme";
// import config from "./config";

// Overall HTML layout
function renderFullPage(html, css) {
  /* ... */
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>My page</title>
      <style id="jss-server-side">${css}</style>
    </head>
    <body>
      <div id="root">${html}</div>
    </body>
  </html>
`;
}
//
export const handleRender = (request, reply) => {
  /* ... */
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  const html = ReactDOMServer.renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    )
  );

  // Grab the CSS from our sheets.
  const css = sheets.toString();

  // Send the rendered page back to the client.
  reply(renderFullPage(html, css));
};

export const serverRender = () => {
  // return axios
  //   .get(`${config.serverUrl}/api/`)
  //   .then(resp => {
  //     return {
  //       initialRender: ReactDOMServer.renderToString(
  //         <App initialData={resp.data} />
  //       ),
  //       initialData: resp.data
  //     };
  //   })
  //   .catch(err => console.error(err));

  return {
    initialRender: ReactDOMServer.renderToString(
      <App initialData={'hallo'} />
    ),
    initialData: 'hello'
  };
};
