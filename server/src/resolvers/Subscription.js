function newPropertySubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_PROPERTY")
}

const newProperty = {
  subscribe: newPropertySubscribe,
  resolve: payload => {
    return payload
  },
}

function newRentSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_RENT")
}

const newRent = {
  subscribe: newRentSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newProperty,
  newRent
}