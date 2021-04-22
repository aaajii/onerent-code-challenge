function renters(parent, args, context) {
  return context.prisma.property
    .findUnique({ where: { id: parent.id } })
    .renters();
}

module.exports = {
  renters
};
