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
    csrfPrevention: false,
  })

  const { url } = await startStandaloneServer(
    server, {
      context: async (req) => {
        return {
          dataSources: {
            trackAPI: new TrackAPI(),
            externalAPI: new ExternalAPI(
              'https://eu-api-v2.acrcloud.com',
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiNzI1NDRjNjhhNmNkMjU2ZTVhNjdkOWU0NzQ3NjRlMzY3MTg3NTZiOGM4NjdmYjA4YjEzOWJlMmFiNjIyNjhkMDNlZTlkZjUwY2JhYWNlMjkiLCJpYXQiOjE3MDg0MjYyMDguNjcwMDM1LCJuYmYiOjE3MDg0MjYyMDguNjcwMDM5LCJleHAiOjIwMjQwNDU0MDguNjE0MzMzLCJzdWIiOiIxNzE5NjYiLCJzY29wZXMiOlsibWV0YWRhdGEiLCJyZWFkLW1ldGFkYXRhIl19.gjnRtcpZ14HrfD7Sk8AboRR-PBYZIG1CX-06JYIROSp4MInwX-F4r57SHdNg0XEYTLV-VrGkhoaySfTHKKRONE13GFhs2A_FvtFTDTgQR5c-RXHp_Ko-SDVTykcAQj7CMe5OrDBskAle12Py4xPrdfg-UqkgXmfb8Yl7Cbv9F-LilYh8MqPnJVLtnmZgIQATYi95Df8V95bEOsSjGdHY-cpftsCv2BOKOnc3hrAhFj0Pqobh4tWOaLxbgTm3eQ65cka9ElWLYsNsCKI6w45nRtAiHJl6x24NQq9y1N36oQP8ktlPT2cv5IegEebnF_Bi0G-dYw60JTCG_ZQCRzLkXUIATSCWNxXBbrNpp0ZgNmlP0nDTEHdEXAfV_Urgo65VvkpmA4oQR4j-9B2PHQ0G8M7q76NM7mfGrB92MFpJ7HWfkaA0uZCKmmaivohQIMqljbC2uMuzy8CSyvU6UmHoA34S6c5UkhyfEv7CH59UWcF7sZlajdY4NFBvaRkpbIdodAHTAtnxl_lfzF4_jVGK3ygBSOZJkEIMwG-q1WTFfiUCHbbsMgwnXQHsgMaiINep1l8q-Fa8kAjBtk5TgQ0YjXa79mz3NzN4Pg-jfwz6MRcoJI4DmLWkU8g8OtO8LBRQ-MnewUw_Kjm26HpAO3aPTY_BnTnT8Vmd5dXRuQoTHjc'
            ),
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