import fp from 'fastify-plugin';
import { EventRepository } from '../../application/event.repository';
import { EventsHandlers } from '../repository/events.repository';
import { EventService } from '../../application/event.service';

declare module 'fastify' {
  interface FastifyInstance {
    eventsService: EventService;
  }
}

export default fp(async (fastify) => {
  const eventsRepository: EventRepository = new EventsHandlers(fastify);
  const eventsService = new EventService(eventsRepository);
  fastify.decorate('eventsService', eventsService);
});
