// import {error} from 'apollo-server-express'

import { MovieExplore, MovieSearch } from '../dataSources/movies';

type MovieArgs = {
  id: string;
};

type searchArgs = {
  query: string;
  offset: number;
  limit: number;
};

type discoverArgs = {
  sort_by: SortBy;
  sort_order: SortOrder;
  year: number;
  genres: eMovieGenre[];
  offset: number;
  limit: number;
};

export const movie = (_: any, { id }: MovieArgs): Partial<Movie> => {
  return { id: 132, title: 'tenet', genre_ids: [eMovieGenre.ACTION] };
};

export const movieSearch = async (
  _: any,
  { query, offset, limit }: searchArgs
): Promise<{ movies: Movie[]; moreMovies: boolean }> => {
  const movieDataSource = new MovieSearch();
  const { movies, moreMovies } = await movieDataSource.getMovies(query, offset, limit);
  return { movies, moreMovies };
};

export const movieDiscover = async (
  _: any,
  params: discoverArgs
): Promise<{ movies: Movie[]; moreMovies: boolean }> => {
  const { offset, limit, ...options } = params;
  const movieDataSource = new MovieExplore();
  const { movies, moreMovies } = await movieDataSource.getMovies(
    options,
    params.offset,
    params.limit
  );
  return { movies, moreMovies };
};
