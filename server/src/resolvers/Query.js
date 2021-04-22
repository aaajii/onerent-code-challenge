async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } }
        ]
      }
    : {};

  const properties = await context.prisma.property.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy
  });

  const count = await context.prisma.property.count({ where });

  return {
    id: 'main-feed',
    properties,
    count
  };
}

module.exports = {
  feed
};
