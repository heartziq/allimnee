"use strict";
const Hapi = require("@hapi/hapi");
const Path =  require('path');

import { serverRender } from './serverRender';

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

  // register public
  await server.register(require('inert'));

  // testing public dir request
  server.route({
    method: 'GET',
    path: '/bundle.js',
    handler: function (request, h) {
      return h.file('bundle.js')
    }
  })

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
    name: "myPlugin",
    version: "1.0.0",
    register: async function(server, options) {

      // Main Page
      server.route({
        method: "GET",
        path: "/",
        handler: function (request, h) {
          const {initialRender, initialState} = serverRender(request);
          return h.view('index', {initialRender, initialState})
        }
      });

      // About Page
      // server.route({
      //   method: "GET",
      //   path: "/about",
      //   handler: function (request, h) {
      //     return h.view('')
      //   }
      // });
    }
  };

  // load one plugin
  await server.register(myPlugin);

  await server.start();
  console.log("server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.error(err);
  process.exit(1);
});

init();
