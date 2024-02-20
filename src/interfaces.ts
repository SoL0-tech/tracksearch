import { ExternalAPI, TrackAPI, UserAPI } from "dataSources"

export interface AppContext {
  token?: string
  jwtSecret: string
  dataSources: {
    externalAPI: ExternalAPI
    trackAPI: TrackAPI
    userAPI: UserAPI
  }
}

export interface ITrack {
  _id?: string
  name: string
  artistName: string
  createdAt?: Date
  updatedAt?: Date
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

export interface IUser {
  _id?: string
  username: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IAuthResponseGql {
  token: string
}