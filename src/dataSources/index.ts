import MovieDataSource from './MovieDataSource';

export type DataSources = {
  movieApi: MovieDataSource;
};

export const createDataSources = () => ({
  movieApi: new MovieDataSource(),
});
