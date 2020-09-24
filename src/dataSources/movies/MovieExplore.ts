import axios from 'axios';
import { api_key, base_url } from '../../shared/movieDB';

import MovieDataSource from './MovieDataSource';

export default class MovieExplore extends MovieDataSource<DiscoverOptions> {
  protected currentPage = 0;
  protected totalPages = 0;
  private dftDiscoverOptions: DiscoverOptions = { sort_by: 'popularity', sort_order: 'desc' };

  /**
   *
   * @param options
   * @param page
   */
  protected async fetchMovies(options: DiscoverOptions, page: number) {
    const query = this.formatQuery(options);

    const URL = `${base_url}/discover/movie?api_key=${api_key}&${query}&page=${page}`;
    const resp = await axios.get(URL);

    this.currentPage = resp.data.page;
    this.totalPages = resp.data.total_pages;

    if (resp.data) {
      return resp.data.results;
    }
    return [];
  }

  /**
   * Fills the undefined properties with the default values
   * @param options
   */
  private fillOptions(options: DiscoverOptions): DiscoverOptions {
    const filledOptions: DiscoverOptions = {};
    Object.keys(this.dftDiscoverOptions).forEach((option) => {
      (filledOptions as any)[option] =
        (options as any)[option] ?? (this.dftDiscoverOptions as any)[option];
    });
    return filledOptions;
  }

  /**
   * Returns a valid query string based on the received options object
   * @param options
   */
  private formatQuery(options: DiscoverOptions): string {
    const { sort_by, sort_order, ...params } = options;
    const formattedQuery = { ...params, sort_by: `${sort_by}.${sort_order}` };
    return Object.keys(formattedQuery).reduce((acc, curr) => {
      return `${acc}&${curr}=${(formattedQuery as any)[curr]}`;
    }, '');
  }
}
