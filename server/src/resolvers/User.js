function rents(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .rents();
}

module.exports = {
  rents
};
