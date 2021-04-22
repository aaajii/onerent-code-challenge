function newPropertySubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_PROPERTY")
}

const newProperty = {
  subscribe: newPropertySubscribe,
  resolve: payload => {
    return payload
  },
}

function newVoteSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_VOTE")
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload
  },
}

module.exports = {
  newProperty,
  newVote
}