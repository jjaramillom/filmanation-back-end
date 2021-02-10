import { MovieResolvers } from '../generated/graphql';
import { Context } from '../createApolloServer';

const nestedMovie: MovieResolvers<Context> = {
  cast: async (movie, {}, { dataSources: { movieApi } }) => movieApi.fetchCredits(movie.id),
};

export default nestedMovie;
