// These schema is taken from official docs: https://mercurius.dev/#/docs/subscriptions
const schema = `
  type Notification {
    id: ID!
    message: String
  }

  type Query {
    notifications: [Notification]
  }

  type Mutation {
    addNotification(message: String): Notification
  }

  type Subscription {
    notificationAdded: Notification
  }
`

let idCount = 1
const notifications = [
  {
    id: idCount,
    message: 'Notification message',
  },
]

const resolvers = {
  Query: {
    notifications: () => notifications,
  },
  Mutation: {
    addNotification: async (_, { message }, { pubsub }) => {
      const id = idCount++
      const notification = {
        id,
        message,
      }
      notifications.push(notification)
      await pubsub.publish({
        topic: 'NOTIFICATION_ADDED',
        payload: {
          notificationAdded: notification,
        },
      })

      return notification
    },
  },
  Subscription: {
    notificationAdded: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (root, args, { pubsub }) =>
        await pubsub.subscribe('NOTIFICATION_ADDED'),
    },
  },
}

module.exports = {
  schema,
  resolvers,
}
