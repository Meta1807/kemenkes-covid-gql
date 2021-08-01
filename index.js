import { ApolloServer } from 'apollo-server';
import application from './modules';

const schema = application.createSchemaForApollo();
const server = new ApolloServer({ schema });

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
