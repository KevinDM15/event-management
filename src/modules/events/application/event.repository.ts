import { IEvent } from "../domain/models/event.model";

export interface EventRepository {
  findAll(): Promise<IEvent[]>;
  create(body: any): Promise<IEvent>;
  update(params: any, body: any): Promise<IEvent>;
  delete(params: any): Promise<void>;
}
