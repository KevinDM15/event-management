export interface IEvent {
  id?: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  creatorId: number;
  locationId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
