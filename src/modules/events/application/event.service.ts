import { FastifyRequest } from "fastify";
import { IEvent } from "../domain/models/event.model";
import { EventRepository } from "./event.repository";
import fs from 'fs';
import xlsx from 'xlsx';
import { excelDateToJSDate, excelTimeToJS } from "src/utils/helpers";

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async getEvents(): Promise<IEvent[]> {
    return this.eventRepository.findAll();
  }

  async uploadEvents(request: FastifyRequest): Promise<any> {
    const eventsToCreate: IEvent[] = [];

    const file = await request.file();
    if (!file) {
      throw new Error("No file uploaded");
    }

    const filePath = `./uploads/${file.filename}`;
    const fileStream = fs.createWriteStream(filePath);
    file.file.pipe(fileStream);

    fileStream.on('finish', async () => {
      const workBook = xlsx.readFile(filePath);
      const sheetName = workBook.SheetNames[0];
      const workSheet = xlsx.utils.sheet_to_json(workBook.Sheets[sheetName]);
      const events = workSheet.map((row: any) => {
        const event = {
          title: row.nombre,
          date: excelDateToJSDate(row.fecha),
          startTime: excelTimeToJS(row.hora_inicio),
          endTime: excelTimeToJS(row.hora_fin),
          locationId: row.ubicacion,
          creatorId: row.creador,
        }

        return event;
      })


      await this.eventRepository.uploadEvents(events);
    })

    return {
      success: true,
      message: "File uploaded successfully",
    }
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
