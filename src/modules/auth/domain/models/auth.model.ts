import bcrypt from 'bcrypt';

export class AuthModel {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static create(email: string, password: string): AuthModel {
    return new AuthModel(email, password);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
