import {
  AppContext,
  ITrack,
} from "../interfaces"

export default {
  async getTrackByNameAndArtist(
    _: undefined,
    { name, artistName }: { name: string, artistName: string },
    { dataSources }: AppContext
  ): Promise<ITrack> {
    return {}
  },
  async getAllTracks(
    _: undefined,
    __: undefined,
    { dataSources }: AppContext
  ): Promise<Array<ITrack>> {
    return []
  },
  async getTrackById(
    _: undefined,
    { internalId }: { internalId: string },
    { dataSources }: AppContext
  ): Promise<ITrack> {
    return {}
  }
}