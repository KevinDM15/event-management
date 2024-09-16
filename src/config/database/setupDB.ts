import { FastifyInstance } from "fastify";
import 'dotenv/config';

export const setupDB = async (fastify: FastifyInstance) => {
  const pg = fastify.pg

  // Check if the database exists
  const checkDB = await pg.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`)
  if (checkDB.rowCount > 0) {
    return
  }

  // Create database
  await pg.query(`CREATE database ${process.env.DB_NAME}`)
}
