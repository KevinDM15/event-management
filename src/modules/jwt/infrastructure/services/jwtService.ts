import { FastifyInstance } from "fastify";

export class JwtService {
  constructor(private fastify: FastifyInstance) {}

  async generateToken(payload: any): Promise<string> {
    return this.fastify.jwt.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return this.fastify.jwt.verify(token);
  }
}
