import { ITrack } from "../interfaces";

export class TrackAPI {
  constructor() {

  }

  async findTrack(name: string, artist: string): Promise<ITrack> {
    throw new Error('Not implemented')
  }

  async getAllTracks(): Promise<Array<ITrack>> {
    throw new Error('Not implemented')
  }

  async getTrack(id: string): Promise<ITrack> {
    throw new Error('Not implemented')
  }

  async updateTrack(id: string, data: Partial<ITrack>): Promise<ITrack> {
    throw new Error('Not implemented')
  }

  async deleteTrack(id: string): Promise<string> {
    throw new Error('Not implemented')
  }
  
  async createTrack(data: Partial<ITrack>): Promise<ITrack> {
    throw new Error('Not implemented')
  }
}