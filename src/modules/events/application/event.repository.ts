import { IEvent } from "../domain/models/event.model";

export interface EventRepository {
  findAll(): Promise<IEvent[]>;
  create(body: any): Promise<IEvent>;
  uploadEvents(event: any[]): Promise<any>;
  update(params: any, body: any): Promise<IEvent>;
  delete(params: any): Promise<void>;
}
