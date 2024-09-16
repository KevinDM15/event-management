import { FastifyRequest } from "fastify";
import { IEvent } from "../domain/models/event.model";
import { EventRepository } from "./event.repository";
import fs from 'fs';
import xlsx from 'xlsx';
import { excelDateToJSDate, excelTimeToJS } from "src/utils/helpers";
import { MapBoxService } from "src/modules/mapbox/infrastructure/services/mapBoxService";
import { LocationRepository } from "src/modules/locations/application/location.repository";
import { ILocation } from "src/modules/locations/domain/models/location.model";

export class EventService {
  constructor (
    private mapBoxService: MapBoxService,
    private eventRepository: EventRepository,
    private locationRepository: LocationRepository,
  ) {}

  async getEvents(): Promise<IEvent[]> {
    return this.eventRepository.findAll();
  }

  async uploadEvents(request: FastifyRequest): Promise<any> {
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
      const events = workSheet.map(async (row: any) => {
        const location: ILocation = {
          name: '',
          address: '',
          city: '',
          country: '',
          latitude: 0,
          longitude: 0,
        }

        const locationData = await this.mapBoxService.getGeocode(row.ubicacion);
        location.name = locationData.features[0].properties.name;
        location.address = locationData.features[0].properties.full_address;
        location.country = locationData.features[0].properties.context.country.name;
        location.latitude = locationData.features[0].properties.coordinates.latitude;
        location.longitude = locationData.features[0].properties.coordinates.longitude;

        const newLocation = await this.locationRepository.create(location);

        const event = {
          title: row.nombre,
          date: excelDateToJSDate(row.fecha),
          startTime: excelTimeToJS(row.hora_inicio),
          endTime: excelTimeToJS(row.hora_fin),
          locationId: newLocation.id || 0,
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
    const location: ILocation = {
      name: '',
      address: '',
      city: '',
      country: '',
      latitude: 0,
      longitude: 0,
    }

    const newEvent = event as IEvent;

    if (event.location) {
      const locationData = await this.mapBoxService.getGeocode(event.location);
      location.name = locationData.features[0].properties.name;
      location.address = locationData.features[0].properties.full_address;
      location.country = locationData.features[0].properties.context.country.name;
      location.latitude = locationData.features[0].properties.coordinates.latitude;
      location.longitude = locationData.features[0].properties.coordinates.longitude;

      const newLocation = await this.locationRepository.create(location);
      newEvent.locationId = newLocation.id || 0;
    }

    return this.eventRepository.create(event);
  }

  async updateEvent(id: any, body: any): Promise<IEvent> {
    return this.eventRepository.update(id, body);
  }

  async deleteEvent(id: any): Promise<void> {
    return this.eventRepository.delete(id);
  }

  async getLocationsAround(id: any): Promise<ILocation[]> {
    const location = await this.eventRepository.findLocationByEventId(id);
    const data = await this.mapBoxService.getDistanceAroundLocation(location.latitude, location.longitude);

    const locations = data.features.map((location: any) => {
      return {
        name: location.properties.name,
        address: location.properties.full_address,
        city: '',
        country: location.properties.context.country.name,
        latitude: location.properties.coordinates.latitude,
        longitude: location.properties.coordinates.longitude,
      }
    })

    return locations;
  }
}
