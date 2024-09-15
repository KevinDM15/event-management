import { AuthRepository } from "../../application/auth.repository";
import { AuthService } from "../../application/auth.service";
import fp from 'fastify-plugin';
import { AuthHandlers } from "../repository/auth.repository";
import { JwtService } from "src/modules/jwt/infrastructure/services/jwtService";

declare module 'fastify' {
  interface FastifyInstance {
    authService: AuthService;
  }
}

export default fp(async (fastify) => {
  const jwtService = new JwtService(fastify);
  const authRespository: AuthRepository = new AuthHandlers(fastify);
  const authService = new AuthService(jwtService, authRespository);
  fastify.decorate('authService', authService);
})
