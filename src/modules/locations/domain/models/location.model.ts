export interface ILocation {
  id?: number;
  name: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  createdAt?: Date;
  updatedAt?: Date;
}
