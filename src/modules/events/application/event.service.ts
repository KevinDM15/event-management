import { IEvent } from "../domain/models/event.model";
import { EventRepository } from "./event.repository";

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getEvents(): Promise<IEvent[]> {
    return this.eventRepository.findAll();
  }

  async createEvent(event: any): Promise<IEvent> {
    return this.eventRepository.create(event);
  }

  async updateEvent(id: any, body: any): Promise<IEvent> {
    return this.eventRepository.update(id, body);
  }

  async deleteEvent(id: any): Promise<void> {
    return this.eventRepository.delete(id);
  }
}
