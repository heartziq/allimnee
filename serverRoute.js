import { serverRender } from "./serverRender";
import fetch from "isomorphic-fetch";
import { MongoClient } from "mongodb";

module.exports = {
  name: "myPlugin",
  version: "1.0.0",
  register: async function(server, options) {
    // initiate Mongo Connection
    const myMongo = new MongoClient("mongodb://localhost:27017/test", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    let conn;
    await myMongo.connect(async (err, result) => {
      conn = await result.db("test").collection("tutor");
    });

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
      handler: async (request, h) => {
        // fetch from api
        const res = await fetch("http://localhost:3000/api/tutor");
        const dataObj = await res.json();

        const state = { tutor: dataObj };
        const { cssData, htmlData, initialState } = serverRender(
          request,
          state
        );

        return h.view("index", {
          pageTitle: "Browse - Tutors",
          cssData,
          htmlData,
          initialState
        });
      }
    });

    // /api/tutor
    server.route({
      method: "GET",
      path: "/api/tutor",
      handler: async function(request, reply) {
        const qResult = await conn.find({}).toArray();
        return reply.response(qResult).code(200);
      }
    });
  }
};
