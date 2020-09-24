import axios from 'axios';
import { api_key, base_url } from '../../shared/movieDB';

import MovieDataSource from './MovieDataSource'

export default class MovieSearch extends MovieDataSource<string> {
  /**
   *
   * @param query
   * @param page
   */
  protected async fetchMovies(query: string, page: number): Promise<Movie[]> {
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