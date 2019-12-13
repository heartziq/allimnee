import { serverRender } from "../renderer/serverRender";
import fetch from "isomorphic-fetch";
import qs from "query-string";

module.exports = {
  name: "route-handling",
  version: "1.0.0",
  register: async function(server) {
    // Main Page
    server.route({
      method: "GET",
      path: "/",
      handler: async function(request, h) {
        console.info("running server fetch(Main)....");

        let qParam = request.query.id ? `?id=${request.query.id}` : ``;
        const { limit, skip } = request.query;
        qParam.concat(`&limit=${limit}&skip=${skip}`);

        const uri = `http://localhost:3000/api/classes${qParam}`;

        const res = await fetch(uri);
        const result = await res.json();

        const state = {
          classes: result
        };

        const { cssData, htmlData, initialState } = serverRender(
          request,
          state
        );

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
        console.info("running server fetch(BrowseTutor)....");

        // getting user param query (backend)
        const qParam = request.query.id ? `?id=${request.query.id}` : ``;
        const uri = `http://localhost:3000/api/tutor${qParam}`;

        // console.log(`qParam: ${qParam}`);
        // fetch from api
        const res = await fetch(uri);
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

    // /test
    server.route({
      method: "GET",
      path: "/test",
      handler: function(request, h) {
        const { cssData, htmlData, initialState } = serverRender(request, {});

        return h.view("index", {
          pageTitle: "test",
          cssData,
          htmlData,
          initialState
        });
      }
    });
  }
};
