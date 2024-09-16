import { FastifyInstance } from "fastify";
import { LocationRepository } from "../../application/location.repository";
import { ILocation } from "../../domain/models/location.model";

export class LocationHandlers implements LocationRepository {
  constructor(private fastify: FastifyInstance) {}

  async create(location: ILocation) {
    const newLocation = await this.fastify.pg.query(
      `INSERT INTO locations (name, address, city, country, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [location.name, location.address, location.city, location.country, location.latitude, location.longitude]
    )

    return newLocation.rows[0];
  }
}
