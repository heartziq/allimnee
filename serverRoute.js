import { serverRender } from "./serverRender";
module.exports = {
  name: "myPlugin",
  version: "1.0.0",
  register: async function(server, options) {
    // Main Page
    server.route({
      method: "GET",
      path: "/",
      handler: function(request, h) {
        const { cssData, htmlData, initialState } = serverRender(request);
        return h.view("index", {
          pageTitle: "home",
          cssData,
          htmlData,
          initialState
        });
      }
    });

    // Browse Page (with id)
    server.route({
      method: "GET",
      path: "/browse",
      handler: function(request, h) {
        const { cssData, htmlData, initialState } = serverRender(request);
        const id = request.query.id || false;
        return h.view("index", {
          pageTitle: "browse",
          cssData,
          htmlData,
          initialState
        });
      }
    });

    server.route({
      method: "GET",
      path: "/test",
      handler: function(request, reply) {
        return reply.response({data: 'helloworld'}).code(200)
      }
    })
  }
};
