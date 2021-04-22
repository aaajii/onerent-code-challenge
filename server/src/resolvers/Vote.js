function property(parent, args, context) {
  return context.prisma.vote
    .findUnique({ where: { id: parent.id } })
    .property();
}

function user(parent, args, context) {
  return context.prisma.vote
    .findUnique({ where: { id: parent.id } })
    .user();
}

module.exports = {
  property,
  user
};
