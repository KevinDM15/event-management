import fp from 'fastify-plugin';
import { EventRepository } from '../../application/event.repository';
import { EventsHandlers } from '../repository/events.repository';
import { EventService } from '../../application/event.service';
import { MapBoxService } from 'src/modules/mapbox/infrastructure/services/mapBoxService';
import { LocationRepository } from 'src/modules/locations/application/location.repository';
import { LocationHandlers } from 'src/modules/locations/infrastructure/repository/locations.repository';

declare module 'fastify' {
  interface FastifyInstance {
    eventsService: EventService;
  }
}

export default fp(async (fastify) => {
  const mapBox = new MapBoxService(fastify);
  const locationRepository: LocationRepository = new LocationHandlers(fastify);
  const eventsRepository: EventRepository = new EventsHandlers(fastify);
  const eventsService = new EventService(mapBox, eventsRepository, locationRepository);
  fastify.decorate('eventsService', eventsService);
});
