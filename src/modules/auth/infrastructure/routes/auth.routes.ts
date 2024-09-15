import { FastifyPluginAsync } from "fastify";

const route: FastifyPluginAsync = async (fastify) => {
  fastify.post("/login", {
    schema: {
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
        required: ["email", "password"],
      }
    }
  }, async (request) => fastify.authService.login(request.body));

  fastify.post("/register", {
    schema: {
      body: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          password: { type: "string"},
        },
        required: ["firstName", "lastName", "email", "password"],
      }
    }
  }, async (request) => fastify.authService.register(request.body));
}

export default route;
