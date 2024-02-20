import jwt from 'jsonwebtoken'
import { AppContext, IAuthResponseGql, ITrackGql } from "../interfaces"
import { TrackMapper } from "../mappers"
import { UserAPI } from '../dataSources'

export default {
  async updateTrack(
    _: undefined,
    { internalId, name, artistName }: { internalId: string, name?: string, artistName?: string},
    { dataSources }: AppContext
  ): Promise<ITrackGql | null> {
    const track = await dataSources.trackAPI.updateTrack(internalId, { name, artistName })
    return track ? TrackMapper.toGraphql(track) : null
  },

  async deleteTrack(
    _: undefined,
    { internalId }: { internalId: string },
    { dataSources }: AppContext
  ): Promise<string> {
    return await dataSources.trackAPI.deleteTrack(internalId)
  },

  async login(
    _: undefined,
    { username, password }: { username: string, password: string},
    { dataSources, jwtSecret }: AppContext
  ): Promise<IAuthResponseGql> {
    const user = await dataSources.userAPI.findUser(username)
    if (!user || !(await UserAPI.isCorrectPassword(password, user.password))) {
      throw new Error('Invalid username/password')
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });

    return {
      token
    }
  },

  async signup(
    _: undefined,
    { username, password }: { username: string, password: string},
    { dataSources, jwtSecret }: AppContext
  ): Promise<IAuthResponseGql> {
    const user = await dataSources.userAPI.findUser(username)
    if (user) {
      throw new Error('Username already taken')
    }

    const newUser = await dataSources.userAPI.createUser(username, password)
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1d' });

    return {
      token
    }
  }
}