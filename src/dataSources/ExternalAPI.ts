import { ITrack } from '../interfaces'

export class ExternalAPI {
  constructor() {

  }

  async fetchTrack(name: string, artistName: string): Promise<ITrack> {
    throw new Error('Not implemented')
  }
}