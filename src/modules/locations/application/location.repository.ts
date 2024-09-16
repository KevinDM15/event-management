import { ILocation } from "../domain/models/location.model";

export interface LocationRepository {
  create(location: ILocation): Promise<ILocation>;
}
