import { AppContext, ITrackGql } from "../interfaces"
import { TrackMapper } from "../mappers"

export default {
  async updateTrack(
    _: undefined,
    { internalId, name, artistName }: { internalId: string, name?: string, artistName?: string},
    { dataSources }: AppContext
  ): Promise<ITrackGql | null> {
    const track = await dataSources.trackAPI.updateTrack(internalId, { name, artistName })
    return track ? TrackMapper.toGraphql(track) : null
  },

  async deleteTrack(
    _: undefined,
    { internalId }: { internalId: string },
    { dataSources }: AppContext
  ): Promise<string> {
    return await dataSources.trackAPI.deleteTrack(internalId)
  }
}