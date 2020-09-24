// import {error} from 'apollo-server-express'

import MovieDataSource from '../dataSources/MovieDataSource';

type MovieArgs = {
  id: string;
};

type MoviesArgs = {
  query: string;
  offset: number;
  limit: number;
};

export const movie = (_: any, { id }: MovieArgs): Partial<Movie> => {
  return { id: 132, title: 'tenet', genres: ['thriller'] };
};

export const movies = async (
  _: any,
  { query, offset, limit }: MoviesArgs
): Promise<{ movies: Movie[]; moreMovies: boolean }> => {
  const movieDataSource = new MovieDataSource();
  const { movies, moreMovies } = await movieDataSource.searchMovies(query, offset, limit);

  return { movies, moreMovies };
};
