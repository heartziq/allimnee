import { serverRender } from "../renderer/serverRender";
import fetch from "isomorphic-fetch";
import qs from "query-string";

module.exports = {
  name: "route-handling",
  version: "1.0.0",
  register: async function (server) {
    // Main Page (Browse ClassList)
    server.route({
      method: "GET",
      path: "/",
      handler: async function (request, h) {
        console.info("running [SERVER] fetch(Main)....");
        const qParam = request.url.search;
        let qStrippedOff = qs.parse(qParam)

        // Get query fields and values as object

        // let qParam = qs.stringify(qStrippedOff);
        // http://localhost:3000/?search=id&basket=1
        // console.log(qStrippedOff.search) // id
        // console.log(qStrippedOff.basket) // 1

        console.log(qs.stringify(qStrippedOff)) // basket=1&search=id

        const uri = `http://localhost:3000/api/classes${qParam}`;
        console.log("serverRoute > uri", uri);
        const res = await fetch(uri);
        const result = await res.json();

        // const list_tutor_id = result.map(eachClass => eachClass._id).join(',');

        // Grab tutor name and img src
        // const tutor_uri = `http://localhost:3000/api/tutor?id=${list_tutor_id}`;
        // const response = await fetch(tutor_uri);
        // const responseResult = await response.json();

        // console.log(responseResult);

        // consolidate with classes (1 tutor can have multiple classes )

        // Overwrite InitialState in redux store
        const state = {
          classes: {
            error: false,
            hasMore: true,
            isLoading: false,
            skip: 0,
            users: result
          },
          hasFetch: true
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

    // Class Details (Indiv class)
    server.route({
      method: "GET",
      path: "/class/{id}",
      handler: async (req, res) => { }
    });

    // BrowseTutor
    server.route({
      method: "GET",
      path: "/browse",
      handler: async (request, h) => {
        console.info("running [SERVER] fetch(BrowseTutor)....");

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
      handler: function (request, h) {
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
