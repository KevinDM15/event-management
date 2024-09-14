import * as path from 'path';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import AutoLoad from '@fastify/autoload';

export async function app(fastify: FastifyInstance) {
  fastify.register(import('@fastify/swagger'));
  fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/documentation'
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
  });
}
