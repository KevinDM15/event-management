import { FastifyPluginAsync } from "fastify";

const route: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", {
    // @ts-ignore
    preHandler: [fastify.authenticate],
  }, async () => fastify.eventsService.getEvents());
  fastify.post("/create", {
    // @ts-ignore
    preHandler: [fastify.authenticate],
    schema: {
      body: {
        type: "object",
        properties: {
          title: { type: "string"},
          date: { type: "string" },
          startTime: { type: "string" },
          endTime: { type: "string" },
          locationId: { type: "number" },
          creatorId: { type: "number" },
        },
        required: ["title", "date", "startTime", "endTime", "locationId", "creatorId"],
      }
    },
  }, async (request) => fastify.eventsService.createEvent(request.body));

  fastify.put("/update/:id", {
    // @ts-ignore
    preHandler: [fastify.authenticate],
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        properties: {
          title: { type: "string"},
          date: { type: "string" },
          startTime: { type: "string" },
          endTime: { type: "string" },
          locationId: { type: "number" },
          creatorId: { type: "number" },
        },
        required: ["title", "date", "startTime", "endTime", "locationId", "creatorId"],
      }
    },
  }, async (request) => fastify.eventsService.updateEvent(request.params, request.body));

  fastify.delete("/delete/:id", {
    // @ts-ignore
    preHandler: [fastify.authenticate],
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
        required: ["id"],
      },
    },
  }, async (request) => fastify.eventsService.deleteEvent(request.params));
}

export default route;
