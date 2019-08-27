'use strict';

module.plugin = {
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

      // etc ...
      await someAsyncMethods();
  }
};