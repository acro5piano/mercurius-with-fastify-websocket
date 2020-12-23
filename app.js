const Fastify = require('fastify')
const fastifyWebsocket = require('fastify-websocket')
const mercurius = require('mercurius')

const { schema, resolvers } = require('./schema')

const app = new Fastify({
  logger: true,
})

// If we register `fastifyWebsocket` on our own, it raises:
//     Error: server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration
// app.register(fastifyWebsocket)

app.register(mercurius, {
  schema,
  resolvers,
  subscription: true,
})

// It can run the app, but it returns `{"error":"unknown route"}` and quit connection immediately
app.get('/ws/hello', { websocket: true }, (conn) => {
  console.log(conn)
})

app.listen(6767)
