import { AuthModel } from "../domain/models/auth.model";
import { LoginResult } from "../domain/models/loginResult.model";
import { UserModel } from "../domain/models/user.model";

export interface AuthRepository {
  findByEmail(email: string): Promise<UserModel>;
  createUser(body: any): Promise<UserModel>;
}
