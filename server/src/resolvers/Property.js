function renters(parent, args, context) {
  return context.prisma.rent
    .findMany({ where: { propertyId: parent.id } })
    .user();
}

module.exports = {
  renters
};
