import * as mongoose from 'mongoose'
import { ITrack } from '../interfaces'

const trackSchema = new mongoose.Schema<ITrack>({
  name: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true,
  },
  ISRC: {
    type: String,
  },
  releaseDate: {
    type: String
  }
});

export const Track = mongoose.model('Track', trackSchema);