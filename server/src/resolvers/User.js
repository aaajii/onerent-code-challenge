function rents(parent, args, context) {
  return context.prisma.rent
    .findMany({ where: { userId: parent.id } })
    .property();
}

module.exports = {
  rents
};
