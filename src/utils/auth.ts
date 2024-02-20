import jwt from 'jsonwebtoken'
import { AppContext } from "../interfaces";

const authenticate = (resolve: Function, _: any, args: any, context: AppContext, info: any) => {
  const token = context.token
  if (!token) {
    throw new Error('No token provided.');
  }

  try {
    jwt.verify(token, context.jwtSecret);
  } catch (error) {
    throw new Error('Invalid or expired token.');
  }

  return resolve(_, args, context, info);
};

export const withAuth = (resolver: any) => (_: any, args: any, context: AppContext, info: any) => {
  return authenticate(resolver, _, args, context, info);
};