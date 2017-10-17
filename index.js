import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();
const graphqlEndpoint = '/graphql';
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({
  endpointURL: graphqlEndpoint,
}));

models.sequelize.sync({ force: true }).then(() => app.listen(8081));
