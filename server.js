"use strict";
const Hapi = require("@hapi/hapi");
const Path = require("path");
const myPlugin = require("./plugins/serverRoute");
const { logStarts } = require("./config");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "public")
      }
    }
  });

  // register plugins
  await server.register([require("inert"), require("@hapi/vision"), myPlugin]);

  // serving static files
  server.route({
    method: "GET",
    path: "/{filename}",
    handler: {
      file: function(request) {
        return request.params.filename;
      }
    }
  });

  server.views({
    engines: {
      ejs: require("ejs")
    },
    relativeTo: __dirname,
    path: Path.resolve("views"),
    layoutPath: Path.resolve("views", "templates"),
    layout: "layout"
  });

  // POST example
  server.route({
    method: "POST",
    path: "/postit",
    handler: function(request, h) {
      //bla bla bla post, mongo etc
      const j = {
        data: "ffff"
      };

      const g = {
        ...j,
        k: "ahaha"
      };

      return h.response(request.payload);

      // return h.response({ ...request.payload, greetings: "thank you" });
      // return h.redirect('/')
    }
  });

  await server.start();
  logStarts(`server running on ${server.info.uri}`);
  // console.log("server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

init();
