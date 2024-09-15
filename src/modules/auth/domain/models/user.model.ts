import bcrypt from 'bcrypt';

export class UserModel {
  readonly id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  readonly created_at: Date;
  readonly updated_at: Date;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.password = password;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  static create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): UserModel {
    return new UserModel(firstName, lastName, email, password);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
