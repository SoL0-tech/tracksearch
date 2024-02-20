import * as bcrypt from 'bcrypt'
import { IUser } from '../interfaces'
import { User } from '../models'

export class UserAPI {
  constructor() {
  }

  async findUser(username: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ username })
      return user
    } catch (e) {
      console.error('Failed fetching user:', e)
      throw new Error('Failed fetching user')
    }
  }

  async createUser(username: string, password: string): Promise<IUser> {
    try {
      const user = new User({ username, password: await UserAPI.hashPassword(password) })
      await user.save()
      return user
    } catch (e) {
      console.error('Failed creating user:', e)
      throw new Error('Failed creating user')
    }
  }

  static async isCorrectPassword(clear: string, hashed: string): Promise<boolean> {
    try {
      return await bcrypt.compare(clear, hashed);
    } catch (error) {
      console.error('Error verifying password:', error);
      return false
    }
  }

  static async hashPassword(password: string): Promise<string> {
    try {
      const SALT_ROUNDS=10
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(password, salt);

      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }
}