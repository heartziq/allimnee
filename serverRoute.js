import { serverRender } from "./serverRender";
import fetch from "isomorphic-fetch";
import { MongoClient } from "mongodb";

// const myMongo = new MongoClient("mongodb://localhost:27017/test", {
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// });

// const getAllTutor = async reply => {
//   await myMongo.connect(async (err, result) => {
//     await result
//       .db("test")
//       .collection("tutor")
//       .find({})
//       .toArray()
//       .then(res => {
//         reply = reply.response(res)
//         // return res;
//         // result.close();
//         // console.log(res)
//         // return 'not read';
//       });
//   });
//   return reply.code(200);
// };

// (async () => {
//   const result = await getAllTutor();
//   console.log(`result: ${result}`);
// })();

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
      handler: async function(request, reply) {
        console.log("calling /api/tutor ...");
        // api tutor list
        // initiate Mongo Connection
        // const myMongo = new MongoClient("mongodb://localhost:27017/test", {
        //   useUnifiedTopology: true,
        //   useNewUrlParser: true
        // });
        // let dataObj;
        // const dataObj = await ....
        // await myMongo.connect(async (err, result) => {
        //   dataObj = await result
        //     .db("test")
        //     .collection("tutor")
        //     .find({})
        //     .toArray()
        //     .then(res => {
        //       // return reply.response(res).code(200)
        //       return res;
        //     });
        // });
        const qResult = await conn.find({}).toArray();
        return reply.response(qResult).code(200);
      }
    });
  }
};
