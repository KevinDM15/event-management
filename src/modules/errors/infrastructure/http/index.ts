import { FastifyInstance } from "fastify";
import { NotFoundException } from "../../application/commons/exceptions";
import { STATUS_CODES } from "src/utils/status-codes";

export const errorHandler: FastifyInstance["errorHandler"] = function (
  error,
  request,
  reply
) {
  if (error instanceof NotFoundException) {
    if (request.method === "DELETE") {
      return reply.code(STATUS_CODES.NO_CONTENT).send();
    }

    return reply.code(STATUS_CODES.NOT_FOUND).send(error.message);
  }

  reply.log.error(
    {
      request: {
        method: request.method,
        url: request.url,
        headers: request.headers,
        body: request.body,
        query: request.query,
        params: request.params,
      },
      error,
    },
    "Unhandled error occurred."
  );

  return reply.code(STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message);
};
