import {
  findAllTutor,
  getAllSubjects,
  getAllArea,
  getAllClasses
} from "../api";

import qs from "query-string";

module.exports = {
  name: "api-endpoint",
  version: "1.0.0",
  register: async function(server) {
    // /api/tutor
    server.route({
      method: "GET",
      path: "/api/tutor",
      handler: async function(request, reply) {
        const _id = request.query.id
          ? { _id: parseInt(request.query.id, 10) }
          : {};

        const qResult = await findAllTutor(_id);
        return reply.response(qResult).code(200);
      }
    });

    // /api/subject
    server.route({
      method: "GET",
      path: "/api/subject",
      handler: async function(request, reply) {
        const qResult = await getAllSubjects();
        return reply.response(qResult).code(200);
      }
    });

    // /api/area
    server.route({
      method: "GET",
      path: "/api/area",
      handler: async function(request, reply) {
        const qResult = await getAllArea();
        return reply.response(qResult).code(200);
      }
    });

    // /api/classes
    server.route({
      method: "GET",
      path: "/api/classes",
      handler: async function(request, reply) {
        // FROM server: http://localhost:3000/api/classes?id=3&limit=1&skip=3
        console.log('endpoint > request.query ', JSON.stringify(request.query));

        const { id, subject } = request.query;
        const filter = {
          _id: id,
          subject
        };

        // get object (strippedOff) and call MongoApi

        // get limit
        const { limit, skip } = request.query;

        const qResult = await getAllClasses(
          filter,
          parseInt(limit, 10),
          parseInt(skip, 10)
        );
        return reply.response(qResult).code(200);
      }
    });

    // POST example
    server.route({
      method: "POST",
      path: "/postit",
      handler: function(request, h) {
        //bla bla bla post, mongo etc
        const j = {
          data: "ffff"
        };

        const g = {
          ...j,
          k: "ahaha"
        };

        return h.response({ data: request.payload });

        // return h.response({ ...request.payload, greetings: "thank you" });
        // return h.redirect('/')
      }
    });
  }
};
