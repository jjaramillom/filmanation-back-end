import { Resolvers } from '../generated/graphql';
import query from './query';
import nestedMovie from './nestedMovie';

const resolvers: Resolvers = {
  Movie: nestedMovie,
  Query: query,
};

export default resolvers;
