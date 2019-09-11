import { serverRender } from "./serverRender";
import fetch from "isomorphic-fetch";
import { MongoClient } from "mongodb";

module.exports = {
  name: "myPlugin",
  version: "1.0.0",
  register: async function(server, options) {
    // Main Page
    server.route({
      method: "GET",
      path: "/",
      handler: function(request, h) {
        const { cssData, htmlData, initialState } = serverRender(request, {
          count: 100
        });
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
        // fetch from api
        fetch("/api/tutor")
          .then(res => res.json())
          .then(dataObj => {
            const state = { tutor: dataObj };
            const { cssData, htmlData, initialState } = serverRender(
              request,
              state
            );
            const id = request.query.id || false;
            return h.view("index", {
              pageTitle: "Browse - Tutors",
              cssData,
              htmlData,
              initialState
            });
          });
      }
    });

    // /api/tutor
    server.route({
      method: "GET",
      path: "/api/tutor",
      handler: function(request, reply) {
        console.log("this runs!");
        // api tutor list
        // initiate Mongo Connection
        const myMongo = new MongoClient("mongodb://localhost:27017/test", {
          useUnifiedTopology: true,
          useNewUrlParser: true
        });
        let dataObj;
        return myMongo.connect(async (err, result) => {
          dataObj = await result
            .db("test")
            .collection("tutor")
            .find({})
            .toArray()
            .then(res => {
              // return reply.response(res).code(200)
              return res;
            });

          return reply.response(dataObj).code(200);
        });
      }
    });

    // test
    server.route({
      method: "GET",
      path: "/test",
      handler: function(request, reply) {
        return reply.response({ data: "helloworld" }).code(200);
      }
    });
  }
};
