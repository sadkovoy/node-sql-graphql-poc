const faker = require('faker');

const { times, random } = require('lodash');

const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');

const db = require('./models');
const resolvers = require('./resolvers');

const typeDefs = importSchema(__dirname + '/schemas/schema.graphql');

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
});

server.applyMiddleware({ app });

db.sequelize.sync().then(() => {
  db.video.bulkCreate(
    times(10, () => ({
      title: faker.lorem.slug(),
    })),
  );
  db.videoCard.bulkCreate(
    times(10, () => ({
      title: faker.lorem.slug(),
      videoId: random(1, 10),
    })),
  );

  app.listen({ port: 8000 }, () =>
    console.log(`🚀 Server started at http://localhost:8000${server.graphqlPath}`),
  );
});
