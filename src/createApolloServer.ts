import { ApolloServer, IResolvers } from 'apollo-server-express';
import { createDataSources, DataSources } from './dataSources';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

export interface Context {
  dataSources: DataSources;
}

export default () =>
  new ApolloServer({
    typeDefs,
    resolvers: resolvers as IResolvers,
    dataSources: () => ({ ...createDataSources() }),
    context: ({ req, connection }) => {
      if (connection) {
        return { dataSources: { ...createDataSources() }, ...connection.context };
      }
    },
  });
