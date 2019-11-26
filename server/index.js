"use strict";
const Path = require("path");
const Hapi = require("@hapi/hapi");

/* TEMPLATE RENDERING */
const Vision = require("@hapi/vision");
const ejs = require("ejs");

/* STATIC FILES */
const Inert = require("@hapi/inert");

/* LOAD CUSTOM PLUGIN(S) */
const RouteHandler = require("./plugins/serverRoute");
const EndPointAPI = require("./plugins/endpoints");

/* LOAD CONFIG FILE(S) */
const { logStarts } = require("../config");

const init = async () => {
  // MAIN SERVER CONFIG
  const serverConfig = {
    host: "localhost",
    port: 3000,
    routes: {
      files: {
        relativeTo: Path.resolve("public")
      }
    }
  };

  const server = Hapi.server(serverConfig);

  // register plugins
  await server.register([Inert, Vision, RouteHandler, EndPointAPI]);

  // ...serve static...
  const staticConfig = {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: true
      }
    }
  };
  server.route(staticConfig);

  // ..config view engine...
  const viewConfig = {
    engines: {
      ejs
    },
    relativeTo: __dirname,
    path: Path.resolve("server", "views"),
    layoutPath: Path.resolve("server", "views", "templates"),
    layout: "layout"
  };
  server.views(viewConfig);

  await server.start();
  logStarts(`server running on ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

init();
