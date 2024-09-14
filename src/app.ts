import * as path from "path";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import AutoLoad from "@fastify/autoload";
import { errorHandler } from "./modules/errors/infrastructure/http";

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
    },
  });
  fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: "/api-docs",
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
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

  fastify.setErrorHandler(errorHandler);

  fastify.ready(() => {
    fastify.log.info(fastify.printRoutes());
  });
}
