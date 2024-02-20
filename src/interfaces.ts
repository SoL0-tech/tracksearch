import { ExternalAPI, TrackAPI } from "dataSources"

export interface AppContext {
  dataSources: {
    externalAPI: ExternalAPI
    trackAPI: TrackAPI
  }
}

export interface ITrack {
  name: string
  artistName: string
  createdAt: Date
  updatedAt: Date
  duration: number
  ISRC?: string
  releaseDate?: string
}