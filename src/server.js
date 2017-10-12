import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import OpticsAgent from 'optics-agent'
import { maskErrors } from 'graphql-errors'
import resolvers from './resolvers'
import schema from './schema'
import config from './config'
const {port} = config.server

process.on('uncaughtException', err => {
  process.exit(1)
})

const app = express()
const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})
// maskErrors(executableSchema)
OpticsAgent.instrumentSchema(executableSchema)
app.use(OpticsAgent.middleware())
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress((req) => ({
      schema: executableSchema,
      context: { opticsContext: OpticsAgent.context(req) }
    }))
)

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'

}))

app.listen(port, '0.0.0.0')
console.log(`listening at ${port}`)
