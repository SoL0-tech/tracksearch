import axios from 'axios'
import { ITrack } from '../interfaces'

export class ExternalAPI {
  constructor(
    private baseUrl: string,
    private token: string,
  ) {
  }

  async fetchTrack(name: string, artistName: string): Promise<ITrack | null> {
    const config = {
      maxBodyLength: Infinity,
      params: {
        query: JSON.stringify({
          track: name,
          artists: [artistName]
        }),
        format: 'json'
      },
      headers: { 
        'Authorization': `Bearer ${this.token}`,
      }
    }

    const { data, status } = await axios.get(
      `${this.baseUrl}/api/external-metadata/tracks`,
      config)

    if (status !== 200) {
      throw new Error('Failed fetching track from external API')
    }

    const track = data?.data?.[0]
    if (!track) {
      return null
    }

    console.log(track.album)
    
    return {
      name: track.name,
      artistName: track.artists[0].name,
      duration: track.duration_ms,
      ...(track.isrc ? { ISRC: track.isrc } : {}),
      ...(track.album.release_date ? { releaseDate: track.album.release_date } : {}),
    }
  }
}