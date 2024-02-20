import { ITrack, ITrackGql } from '../interfaces'

export class TrackMapper {
  static toGraphql(track: ITrack): ITrackGql {
    return {
      internalId: track._id || "",
      name: track.name,
      artist_name: track.artistName,
      createdAt: track.createdAt?.toISOString() || "",
      updatedAt: track.updatedAt?.toISOString() || "",
      duration: track.duration,
      ...(track.ISRC ? { ISRC: track.ISRC } : {}),
      ...(track.releaseDate ? { release_date: track.releaseDate } : {}),
    }
  }
}