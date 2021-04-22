const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

async function post(parent, args, context, info) {

  const newProperty = await context.prisma.property.create({
    data: {
      street: args.street,
      city: args.city,
      state: args.state,
      zip: args.zip
    }
  });
  context.pubsub.publish('NEW_PROPERTY', newProperty);

  return newProperty;
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password }
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(
    args.password,
    user.password
  );
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function rent(parent, args, context, info) {
  const { userId } = context;
  const rent = await context.prisma.rent.findUnique({
    where: {
      propertyId_userId: {
        propertyId: Number(args.propertyId),
        userId: userId
      }
    }
  });

  if (Boolean(rent)) {
    throw new Error(
      `You already rented this property: ${args.propertyId}`
    );
  }

  const newRent = context.prisma.rent.create({
    data: {
      user: { connect: { id: userId } },
      property: { connect: { id: Number(args.propertyId) } }
    }
  });
  context.pubsub.publish('NEW_RENT', newRent);

  return newRent;
}

module.exports = {
  post,
  signup,
  login,
  rent
};
