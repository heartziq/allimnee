"use strict";

const Hapi = require("@hapi/hapi");
const { serverRender } = require("./serverRender");
const { handleRender } = require("./serverRender");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 3000
  });

  // register view
  await server.register(require("@hapi/vision"));
  server.views({
    engines: {
      ejs: require("ejs")
    },
    relativeTo: __dirname,
    path: "views"
  });

  // create Plugin
  const myPlugin = {
    name: 'myPlugin',
    version: '1.0.0',
    register: async function (server, options) {
  
        // Create a route for example
  
        server.route({
            method: 'GET',
            path: '/test',
            handler: function (request, h) {
                return 'hello, world';
            }
        });
    }
  };

   // load one plugin

   await server.register(myPlugin);

  // routing
  server.route({
    method: "GET",
    path: "/",
    handler: function(request, h) {
      const { initialRender, initialData } = serverRender();
      return h.view("index", { title: "elmo", initialRender, initialData });
    }
  });

  await server.start();
  console.log("server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

init();
