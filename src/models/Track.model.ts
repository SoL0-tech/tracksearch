import * as mongoose from 'mongoose'

const trackSchema = new mongoose.Schema({
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
});

export const Track = mongoose.model('Track', trackSchema);