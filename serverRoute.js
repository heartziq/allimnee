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
        const { cssData, htmlData, initialState } = serverRender(request, { count: 100 });
        return h.view("index", {
          pageTitle: "home",
          cssData,
          htmlData,
          initialState
        });
      }
    });

    // BrowseTutor
    server.route({
      method: "GET",
      path: "/browse",
      handler: function(request, h) {
        const state = { tutor: 'Anna' }
        const { cssData, htmlData, initialState } = serverRender(request, state);
        const id = request.query.id || false;
        return h.view("index", {
          pageTitle: "Browse - Tutors",
          cssData,
          htmlData,
          initialState
        });
      }
    });

    // BrowseTutor
    // server.route({
    //   method: 'GET',
    //   path: '/BrowseTutor',
    //   handler: function (request, reply) {


    //   }
    // })

    // test
    server.route({
      method: "GET",
      path: "/test",
      handler: function(request, reply) {
        return reply.response({data: 'helloworld'}).code(200)
      }
    })
  }
};
