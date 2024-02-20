import {
  AppContext,
  ITrackGql,
} from "../interfaces"
import { TrackMapper } from "../mappers"

export default {
  async getTrackByNameAndArtist(
    _: undefined,
    { name, artistName }: { name: string, artistName: string },
    { dataSources }: AppContext
  ): Promise<ITrackGql | null> {
    let track = await dataSources.trackAPI.findTrack(name, artistName)

    if (!track) {
      const remoteTrack = await dataSources.externalAPI.fetchTrack(name, artistName)
      if (!remoteTrack) {
        return null
      }

      track = await dataSources.trackAPI.createTrack(remoteTrack)
    }
    
    return TrackMapper.toGraphql(track)
  },

  async getAllTracks(
    _: undefined,
    __: undefined,
    { dataSources }: AppContext
  ): Promise<Array<ITrackGql>> {
    const tracks = await dataSources.trackAPI.getAllTracks()
    return tracks.map(TrackMapper.toGraphql)
  },

  async getTrackById(
    _: undefined,
    { internalId }: { internalId: string },
    { dataSources }: AppContext
  ): Promise<ITrackGql | null> {
    const track = await dataSources.trackAPI.getTrack(internalId)
    return track ? TrackMapper.toGraphql(track) : null
  }
}