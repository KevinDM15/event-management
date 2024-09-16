import { JwtService } from "src/modules/jwt/infrastructure/services/jwtService";
import { AuthModel } from "../domain/models/auth.model";
import { LoginResult } from "../domain/models/loginResult.model";
import { AuthRepository } from "./auth.repository";
import bcrypt from 'bcrypt';
import { RegisterResult } from "../domain/models/registerResult.model";

export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository
  ) {}

  async login(body: any): Promise<LoginResult> {
    const response: LoginResult = {
      success: false,
      message: '',
      token: '',
    }

    const user = await this.authRepository.findByEmail(body.email);
    if (!user) {
      response.message = 'User not found';
      response.success = false;
      response.token = '';

      return response;
    }

    const authModel = AuthModel.create(user.email, user.password);
    const isValidPassword = await authModel.comparePassword(body.password);
    if (!isValidPassword) {
      response.message = 'Invalid password';
      response.success = false;
      response.token = '';

      return response;
    }

    response.message = 'Login success';
    response.success = true;
    response.token = await this.jwtService.generateToken({ id: user.id, email: user.email });

    return response;
  }

  async register(body: any): Promise<RegisterResult> {
    const userExists = await this.authRepository.findByEmail(body.email);
    if (userExists) {
      return {
        success: false,
        message: 'User already exists',
      }
    }

    const user = await this.authRepository.createUser(body);

    return {
      success: true,
      message: 'User created',
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    }
  }
}
