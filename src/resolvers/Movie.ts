import { QueryResolvers, Movie } from '../generated/graphql';
import { Context } from '../createApolloServer';
import { Movie as MovieApi } from '../dataSources/MovieDataSource';
import { response } from 'express';

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
    overview: '',
    cast: null,
  };
};

export const movieSearch: QueryResolvers<Context>['movieSearch'] = async (
  _,
  { query, offset, limit },
  { dataSources: { movieApi } }
) => {
  const { movies, moreMovies } = await movieApi.searchMovies(
    query,
    offset ?? undefined,
    limit ?? undefined
  );
  return { moreMovies, movies: movies.map((m) => mapMovie(m)) };
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
  return { moreMovies, movies: movies.map((m) => mapMovie(m)) };
};

const mapMovie = (movie: MovieApi): Movie => ({
  ...movie,
  cast: null,
});
