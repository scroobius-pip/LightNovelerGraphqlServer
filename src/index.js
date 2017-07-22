import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import OpticsAgent from 'optics-agent'
import { maskErrors } from 'graphql-errors'
import resolvers from './resolvers'
// import mock from './mock'
import schema from './schema'

process.on('uncaughtException', err => {
  console.log(err.stack)
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

app.listen(8080)
console.log('listening at 8080')
