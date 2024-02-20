import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "fs"
import path from "path";
import { gql } from "graphql-tag"
import * as mongoose from 'mongoose'
import resolvers from './resolvers'
import { ExternalAPI, TrackAPI } from "./dataSources";

mongoose.connect('mongodb://localhost:27017/', {
  autoCreate: true,
  user: 'root',
  pass: 'root',
});

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schemas/schema.graphql"), {
    encoding: "utf-8",
  })
)

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(
    server, {
      context: async (req) => {
        return {
          dataSources: {
            trackAPI: new TrackAPI(),
            externalAPI: new ExternalAPI(),
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