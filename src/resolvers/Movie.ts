import { QueryResolvers } from '../generated/graphql';
import { Context } from '../createApolloServer';

export const movie: QueryResolvers<Context>['movie'] = (
  _,
  { id },
  { dataSources: { movieApi } }
) => {
  return {
    id: '132',
    title: 'tenet',
    genre_ids: [6],
    adult: false,
    genre_names: [],
    original_title: '',
    popularity: 3,
    poster_path: '',
    vote_average: 4,
    vote_count: 10,
    release_date: '',
  };
};

export const movieSearch: QueryResolvers<Context>['movieSearch'] = async (
  _,
  { query, offset, limit },
  { dataSources: { movieApi } }
) => {
  return await movieApi.searchMovies(query, offset ?? undefined, limit ?? undefined);
};

export const movieDiscover: QueryResolvers<Context>['movieDiscover'] = async (
  _,
  params,
  { dataSources: { movieApi } }
) => {
  const { offset, limit, ...options } = params;
  const { movies, moreMovies } = await movieApi.exploreMovies(
    { genres: [] },
    params.offset ?? undefined,
    params.limit ?? undefined
  );
  return { movies, moreMovies };
};
