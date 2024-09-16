import { FastifyInstance } from "fastify";
import { EventRepository } from "../../application/event.repository";
import { IEvent } from "../../domain/models/event.model";

export class EventsHandlers implements EventRepository {
  constructor(private fastify: FastifyInstance) {}

  async findAll() {
    const events = await this.fastify.pg.query("SELECT * FROM events");
    return events.rows;
  }

  async create(body: any) {
    const event = body as IEvent;
    const newEvent = await this.fastify.pg.query(
      `INSERT INTO events (title, date, start_time, end_time, location_id, creator_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [event.title, event.date, event.startTime, event.endTime, event.locationId, event.creatorId]
    )

    return newEvent.rows[0];
  }

  async uploadEvents(events: IEvent[]) {
    const result = await this.fastify.pg.query(
      `
        INSERT INTO events (title, date, start_time, end_time, location_id, creator_id)
        VALUES ${events.map((event) => `('${event.title}', '${event.date}', '${event.startTime}', '${event.endTime}', ${event.locationId}, ${event.creatorId})`).join(',')}
      `
    )

    return result.rows;
  }

  async update(params: any, body: any) {
    const event = body as IEvent;
    const updatedEvent = await this.fastify.pg.query(
      `UPDATE events SET title = $1, date = $2, start_time = $3, end_time = $4, location_id = $5, creator_id = $6 WHERE id = $7 RETURNING *`,
      [event.title, event.date, event.startTime, event.endTime, event.locationId, event.creatorId, params.id]
    )

    return updatedEvent.rows[0];
  }

  async delete(params: any) {
    await this.fastify.pg.query(`DELETE FROM events WHERE id = $1`, [params.id]);
  }

  async findLocationByEventId(params: any) {
    const location = await this.fastify.pg.query(
      `SELECT * FROM events INNER JOIN locations ON events.location_id = locations.id WHERE events.id = $1`,
      [params.id]
    )

    return location.rows[0];
  }
}
