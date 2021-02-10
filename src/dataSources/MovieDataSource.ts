import { RESTDataSource } from 'apollo-datasource-rest';
import { Genre, SortBy, SortOrder } from '../generated/graphql';
import { movies_per_page, api_key, base_url } from '../shared/movieDB';

export type Movie = {
  id: string;
  title: string;
  genre_ids: number[];
  genre_names: Genre[];
  original_title: string;
  popularity: number;
  vote_count: 1712;
  poster_path: string;
  vote_average: number;
  release_date: string;
  video: boolean;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  overview: string;
};

type Cast = {
  name: string;
  adult: boolean;
  gender: number;
  popularity: number;
  profile_path: string;
  character: string;
};

type FetchedMovies = {
  movies: Movie[];
  moreMovies: boolean;
};

type DiscoverOptions = {
  sort_by?: SortBy;
  sort_order?: SortOrder;
  year?: number;
  genres?: Genre[];
};

enum eMovieGenre {
  ACTION = 28,
  ADVENTURE = 12,
  ANIMATION = 16,
  COMEDY = 35,
  CRIME = 80,
  DOCUMENTARY = 99,
  DRAMA = 18,
  FAMILY = 10751,
  FANTASY = 14,
  HISTORY = 36,
  HORROR = 27,
  MUSIC = 10402,
  MYSTERY = 9648,
  ROMANCE = 10749,
  SCIFI = 878,
  TV = 10770,
  THRILLER = 53,
  WAR = 10752,
  WESTERN = 37,
}

export default class MovieDataSource extends RESTDataSource {
  protected currentPage = 0;
  protected totalPages = 0;

  constructor() {
    super();
    this.baseURL = base_url;
  }

  /**
   *
   * @param options
   * @param page
   */
  public async exploreMovies(
    options: DiscoverOptions = {
      sort_by: SortBy.Popularity,
      sort_order: SortOrder.Desc,
      genres: [],
      year: 2020,
    },
    offset: number = 0,
    limit: number = 5
  ): Promise<FetchedMovies> {
    const query = this.formatQuery(options);
    const arrIndexes = this.getArrayLimits(offset, limit);

    const URL = `/discover/movie?api_key=${api_key}&${query}&page=${this.getStartingPage(
      offset
    )}`;
    const resp = await this.get(URL);

    // TODO set properly the moreMovies prop. Take into account the sliced movies at the end of the array
    // TODO Should the last movie idx be added to track how to continue paginating?
    const paginatedMovies = resp?.results.slice(arrIndexes[0], arrIndexes[1]) ?? [];

    return {
      moreMovies: resp.page < resp.total_pages,
      movies: this.mapGenres(paginatedMovies),
    };
  }

  /**
   *
   * @param query
   * @param page
   */
  public async searchMovies(
    query: string,
    offset: number = 0,
    limit: number = 5
  ): Promise<FetchedMovies> {
    const arrIndexes = this.getArrayLimits(offset, limit);
    const URL = `/search/movie?api_key=${api_key}&query=${query}&page=${this.getStartingPage(
      offset
    )}`;

    const resp = await this.get(URL);

    // TODO set properly the moreMovies prop. Take into account the sliced movies at the end of the array
    // TODO Should the last movie idx be added to track how to continue paginating?
    const paginatedMovies = resp?.results.slice(arrIndexes[0], arrIndexes[1]) ?? [];

    return {
      moreMovies: resp.page < resp.total_pages,
      movies: this.mapGenres(paginatedMovies),
    };
  }

  /**
   *
   * @param query
   * @param page
   */
  public async fetchCredits(id: string): Promise<Cast[]> {
    const URL = `/movie/${id}/credits?api_key=${api_key}`;

    const resp = await this.get(URL);
    return resp.cast;
  }

  /**
   * returns the page number for the first movie fetch
   * @param offset
   */
  private getStartingPage(offset: number): number {
    return Math.ceil((offset > 0 ? offset : 1) / movies_per_page);
  }

  /**
   * Sets the limits in which the final movie array should be cut
   * @param offset
   * @param limit
   */
  private getArrayLimits(offset: number, limit: number): [number, number] {
    const startIndex = offset % movies_per_page;
    return [startIndex, limit + startIndex];
  }

  /**
   * returns the received movie list with the added genre_names property for every object.
   * @param movies
   */
  private mapGenres(movies: Movie[]): Movie[] {
    return movies.map((movie) => {
      let genre_names: Genre[] = [];
      if (movie.genre_ids) {
        genre_names = movie.genre_ids.map((genre) => {
          return eMovieGenre[genre];
        }) as Genre[];
      }
      return { ...movie, genre_names };
    });
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
