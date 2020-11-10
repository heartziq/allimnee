import {
  findTutorId,
  findAllTutor,
  getAllSubjects,
  getAllArea,
  getAllClasses
} from "../api";

module.exports = {
  name: "api-endpoint",
  version: "1.0.0",
  register: async function (server) {
    // /api/tutor
    server.route({
      method: "GET",
      path: "/api/tutor",
      handler: async function (request, reply) {
        let _id = request.query.id;
        let qResult;

        switch (true) {
          case (request.query.id && request.query.id.includes(",")):
            _id = { _id: { $in: request.query.id.split(',').map(Number) } };
            qResult = await findTutorId(_id);
            console.log("multiple ids detected!");
            break;
          case (typeof request.query.id !== 'undefined'):
            _id = { _id: parseInt(request.query.id, 10) }
            qResult = await findAllTutor(_id);
            console.log("single id detected")
            break;
          default:
            _id = {};
            qResult = await findAllTutor(_id);
            console.log("query all string")
        }
        // Check if multiple ids
        // if (request.query.id && request.query.id.includes(","))
        //   console.log("multiple ids detected!")

        // const _id = request.query.id
        //   ? { _id: parseInt(request.query.id, 10) }
        //   : { _id: { $in: [3, 2, 0] } };



        return reply.response(qResult).code(200);
      }
    });

    // /api/subject
    server.route({
      method: "GET",
      path: "/api/subject",
      handler: async function (request, reply) {
        const qResult = await getAllSubjects();
        return reply.response(qResult).code(200);
      }
    });

    // /api/area
    server.route({
      method: "GET",
      path: "/api/area",
      handler: async function (request, reply) {
        const qResult = await getAllArea();
        return reply.response(qResult).code(200);
      }
    });

    // /api/classes
    server.route({
      method: "GET",
      path: "/api/classes",
      handler: async function (request, reply) {
        const { subject, limit, skip } = request.query;
        const filter = { ...JSON.parse(JSON.stringify({ subject })) }

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
      handler: function (request, h) {
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
