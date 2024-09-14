import fastifyPostgres from '@fastify/postgres';
import 'dotenv/config';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { dbConfig } from 'src/config/database/dbConfig';

/**
 * This plugins adds some utilities to handle @fastify/postgres
 *
 */
export default fp(async function (fastify: FastifyInstance) {
  const { user, password, database, host, port } = dbConfig;

  await fastify.register(fastifyPostgres, {
    connectionString: `postgres://${user}:${password}@${host}:${[port]}/${database}`,
  });

  fastify.log.info('Postgres connected');
});
