import axios from 'axios';
import { api_key, base_url, movies_per_page } from '../shared/movieDB';

type FetchedMovies = {
  movies: Movie[];
  moreMovies: boolean;
};

export default class MovieDataSource {
  private currentPage = 0;
  private totalPages = 0;

  public async searchMovies(
    query: string,
    offset: number = 0,
    limit: number = 5
  ): Promise<FetchedMovies> {
    this.currentPage = Math.ceil((offset > 0 ? offset : 1) / movies_per_page);
    const arrayStart = offset - (this.currentPage - 1) * movies_per_page;

    let movies = await this.fetchMoviesBySearch(query, this.currentPage);

    while (movies.length < limit && this.currentPage < this.totalPages) {
      movies = [...movies, ...(await this.fetchMoviesBySearch(query, this.currentPage + 1))];
    }

    // TODO set properly the moreMovies prop. Take into account the sliced movies at the end of the array
    return {
      moreMovies: this.currentPage < this.totalPages,
      movies: movies.slice(arrayStart, limit + arrayStart),
    };
  }

  private async fetchMoviesBySearch(query: string, page: number): Promise<Movie[]> {
    const URL = `${base_url}/search/movie?api_key=${api_key}&query=${query}&page=${page}`;
    const resp = await axios.get(URL);

    this.currentPage = resp.data.page;
    this.totalPages = resp.data.total_pages;

    if (resp.data) {
      return resp.data.results;
    }
    return [];
  }
}
