import { FastifyInstance } from "fastify";
import { AuthRepository } from "../../application/auth.repository";
import { UserModel } from "../../domain/models/user.model";

export class AuthHandlers implements AuthRepository {
  constructor(private fastify: FastifyInstance) {}

  async findByEmail(email: string): Promise<UserModel> {
    const user = await this.fastify.pg.query('SELECT * FROM users WHERE email = $1', [email]);

    return user.rows[0];
  }

  async createUser(body: any): Promise<UserModel> {
    const userModel = UserModel.create(body.firstName, body.lastName, body.email, body.password);
    const hashedPassword = await userModel.hashPassword(body.password);
    const user = await this.fastify.pg.query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [body.firstName, body.lastName, body.email, hashedPassword]);

    return user.rows[0];
  }
}
