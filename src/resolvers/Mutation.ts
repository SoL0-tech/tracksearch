import { AppContext, ITrack } from "interfaces"

export default {
  async updateTrack(
    _: undefined,
    { internalId, name, artistName }: { internalId: string, name?: string, artistName?: string},
    { dataSources }: AppContext
  ): Promise<ITrack> {
    return {}
  },
  async deleteTrack(
    _: undefined,
    { internalId }: { internalId: string },
    { dataSources }: AppContext
  ): Promise<string> {
    return ""
  }
}