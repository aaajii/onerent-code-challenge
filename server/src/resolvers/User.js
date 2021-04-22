function properties(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .properties();
}

module.exports = {
  properties
};
