import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "fs"
import path from "path";
import { gql } from "graphql-tag"
import * as mongoose from 'mongoose'
import dotenv from 'dotenv'
import resolvers from './resolvers'
import { ExternalAPI, TrackAPI, UserAPI } from "./dataSources";

// load environment variables
dotenv.config()

for (const name of [
  'MONGO_USERNAME',
  'MONGO_PASSWORD',
  'ACRCLOUD_BASEURL',
  'ACRCLOUD_TOKEN',
  'JWT_SECRET',
]) {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable ${name}`)
  }
}

const mongoUser = process.env['MONGO_USERNAME'] || ''
const mongoPass = process.env['MONGO_PASSWORD'] || ''
const acrBaseUrl = process.env['ACRCLOUD_BASEURL'] || ''
const acrToken = process.env['ACRCLOUD_TOKEN'] || ''
const jwtSecret = process.env['JWT_SECRET'] || ''

// connect to mongo
mongoose.connect('mongodb://localhost:27017/', {
  autoCreate: true,
  user: mongoUser,
  pass: mongoPass,
});

// configure, initialize and start Graphql server
const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schemas/schema.graphql"), {
    encoding: "utf-8",
  })
)

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
  })

  const { url } = await startStandaloneServer(
    server, {
      context: async (req) => {
        return {
          jwtSecret,
          dataSources: {
            externalAPI: new ExternalAPI(
              acrBaseUrl,
              acrToken,
            ),
            trackAPI: new TrackAPI(),
            userAPI: new UserAPI(),
          }
        }
      }
    })
  
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();