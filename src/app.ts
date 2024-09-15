import * as path from "path";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import AutoLoad from "@fastify/autoload";
import { errorHandler } from "./modules/errors/infrastructure/http";
import { STATUS_CODES } from "./utils/status-codes";

export async function app(fastify: FastifyInstance) {
  fastify.register(import("@fastify/swagger"), {
    swagger: {
      info: {
        title: "Events Management API",
        description: "Events Management API",
        version: "1.0.0",
      },
      consumes: ["application/json"],
      produces: ["application/json"],
      securityDefinitions: {
        BearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
        }
      },
      security: [{ BearerAuth: [] }]
    },
  });

  fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: "/api-docs",
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
  });

  fastify.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'supersecret',
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "modules/auth/infrastructure/routes"),
    options: { prefix: "/api/auth" },
  });

  // Registering services from the auth module
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "modules/auth/infrastructure/services"),
  });

  // Registering routes from the events module
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "modules/events/infrastructure/routes"),
    options: { prefix: "/api/events" },
  });

  // Registering services from the events module
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "modules/events/infrastructure/services"),
  });

  fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.code(STATUS_CODES.UNAUTHORIZED).send({ message: 'Unauthorized' });
    }
  })

  fastify.setErrorHandler(errorHandler);

  fastify.ready(() => {
    fastify.log.info(fastify.printRoutes());
  });
}
