import { ExternalAPI, TrackAPI } from "dataSources"

export interface AppContext {
  dataSources: {
    externalAPI: ExternalAPI
    trackAPI: TrackAPI
  }
}

export interface ITrack {
  _id: string
  name: string
  artistName: string
  createdAt: Date
  updatedAt: Date
  duration: number
  ISRC?: string
  releaseDate?: string
}

export interface ITrackGql {
  internalId: string
  name: string
  artist_name: string
  createdAt: string
  updatedAt: string
  duration: number
  ISRC?: string
  release_date?: string
}