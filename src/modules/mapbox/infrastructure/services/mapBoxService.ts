import { FastifyInstance } from "fastify";
import axios from "axios";

export class MapBoxService {
  constructor(private fastify: FastifyInstance) {}

  async getGeocode(address: string): Promise<any> {
    try {
      const endpoint = `https://api.mapbox.com/search/geocode/v6/forward?q={${address}}&access_token=${process.env.MAPBOX_TOKEN}`;
      const response = await axios.get(endpoint);

      return response.data;
    } catch (error) {
      this.fastify.log.error(error);
      throw new Error("Error getting geocode");
    }
  }

  async getDistanceAroundLocation(latitude: number, longitude: number): Promise<any> {
    try {
      const endpoint = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${process.env.MAPBOX_TOKEN}`;
      const response = await axios.get(endpoint);

      return response.data;
    } catch (error) {
      this.fastify.log.error(error);
      throw new Error("Error getting distance");
    }
  }
}
