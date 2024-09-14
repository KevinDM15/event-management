import 'dotenv/config';
import fastifyPostgres from '@fastify/postgres';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { dbConfig } from 'src/config/database/dbConfig';

const { user, password, host, port, database } = dbConfig;

export const dbConnection = (async (fastify: FastifyInstance) => {
  fastify.register(fastifyPostgres, {
    connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
  });

  console.log('pg', fastify.pg)
})
