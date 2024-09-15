export interface RegisterResult {
  success: boolean;
  message: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
