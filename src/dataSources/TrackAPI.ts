import { ITrack } from "../interfaces";
import { Track } from '../models'

export class TrackAPI {
  constructor() {
  }

  async findTrack(name: string, artistName: string): Promise<ITrack | null> {
    try {
      const track = await Track.findOne({ name, artistName })
      return track
    } catch (e) {
      console.error('Error fetching track:', e)
      throw new Error('Error fetching track')
    }
  }

  async getAllTracks(): Promise<Array<ITrack>> {
    try {
      const tracks = await Track.find({})
      return tracks
    } catch (e) {
      console.error('Error fetching all tracks:', e)
      throw new Error('Error fetching tracks')
    }
  }

  async getTrack(id: string): Promise<ITrack | null> {
    try {
      const track = await Track.findById(id)
      return track
    } catch (e) {
      console.error('Error fetching track by id:', e)
      throw new Error('Error fetching track by id')
    }
  }

  async updateTrack(id: string, data: Partial<ITrack>): Promise<ITrack | null> {
    try {
      const track = await Track.findByIdAndUpdate(id, data, { new: true })
      return track
    } catch (e) {
      console.error('Error updating track:', e)
      throw new Error('Error updating track')
    }
  }

  async deleteTrack(id: string): Promise<string> {
    try {
      const track = await Track.findByIdAndDelete(id)
      return track ? id : ""
    } catch (e) {
      console.error('Error deleting track:', e)
      throw new Error('Error deleting track')
    }
  }
  
  async createTrack(data: Partial<ITrack>): Promise<ITrack> {
    try {
      const track = new Track(data);
      await track.save();
      return track;
    } catch (e) {
      console.error('Error creating track:', e);
      throw new Error('Error creating track');
    }
  }
}