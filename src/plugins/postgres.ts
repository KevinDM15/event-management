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
  const { user, password, database } = dbConfig;

  await fastify.register(fastifyPostgres, {
    connectionString: `postgres://${user}:${password}@localhost:5432/${database}`,
  });

  fastify.log.info('Postgres connected');

  
});
