import { ExternalAPI, TrackAPI } from "dataSources"

export interface AppContext {
  dataSources: {
    externalAPI: ExternalAPI
    trackAPI: TrackAPI
  }
}

export interface ITrack {

}