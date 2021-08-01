const { ApolloServer, gql } = require('apollo-server');
const application = require('./modules');

const schema = application.createSchemaForApollo();
const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
