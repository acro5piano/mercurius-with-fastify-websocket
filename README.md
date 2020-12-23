# mercurius-with-fastify-websocket

How to use both mercurius and fastify-websocket, using GraphQL subscriptions?

# Reproduce

```
yarn install
node app.js
```

Then connect to ws://127.0.0.1:6767/ws and you'll see the following output:

```
$ wscat -c ws://127.0.0.1:6767/ws

Connected (press CTRL+C to quit)
< {"error":"unknown route"}
Disconnected (code: 1005, reason: "")
```
