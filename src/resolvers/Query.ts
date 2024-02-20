import {
  AppContext,
  ITrack,
} from "../interfaces"

export default {
  async getTrackByNameAndArtist(
    _: undefined,
    { name, artistName }: { name: string, artistName: string },
    { dataSources }: AppContext
  ): Promise<ITrack | null> {
    let track = await dataSources.trackAPI.findTrack(name, artistName)

    if (!track) {
      const remoteTrack = await dataSources.externalAPI.fetchTrack(name, artistName)
      if (!remoteTrack) {
        return null
      }

      track = await dataSources.trackAPI.createTrack(remoteTrack)
    }
    
    return track
  },
  async getAllTracks(
    _: undefined,
    __: undefined,
    { dataSources }: AppContext
  ): Promise<Array<ITrack>> {
    return await dataSources.trackAPI.getAllTracks()
  },
  async getTrackById(
    _: undefined,
    { internalId }: { internalId: string },
    { dataSources }: AppContext
  ): Promise<ITrack | null> {
    return await dataSources.trackAPI.getTrack(internalId)
  }
}