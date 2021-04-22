function postedBy(parent, args, context) {
  return context.prisma.property
    .findUnique({ where: { id: parent.id } })
    .postedBy();
}

function votes(parent, args, context) {
  return context.prisma.property
    .findUnique({ where: { id: parent.id } })
    .votes();
}

module.exports = {
  postedBy,
  votes
};
