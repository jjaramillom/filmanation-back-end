import { movies_per_page } from '../../shared/movieDB';

type FetchedMovies = {
  movies: Movie[];
  moreMovies: boolean;
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

export default abstract class MovieDataSource<C extends string | DiscoverOptions> {
  protected currentPage = 0;
  protected totalPages = 0;

  /**
   * fetches the movies from the appropriate endpoint
   * @param options
   * @param page
   */
  protected abstract async fetchMovies(options: C, page: number): Promise<Movie[]>;

  /**
   * returns the fetched movies according to the given parameters
   * @param options
   * @param offset
   * @param limit
   */
  public async getMovies(
    options: C,
    offset: number = 0,
    limit: number = 5
  ): Promise<FetchedMovies> {
    this.currentPage = this.getStartingPage(offset);
    const arrIndexes = this.getArrayLimits(offset, limit);

    let movies = await this.fetchMovies(options, this.currentPage);

    while (movies.length < limit && this.currentPage < this.totalPages) {
      movies = [...movies, ...(await this.fetchMovies(options, this.currentPage + 1))];
    }

    // TODO set properly the moreMovies prop. Take into account the sliced movies at the end of the array
    // TODO Should the last movie idx be added to track how to continue paginating?
    movies = movies.slice(arrIndexes[0], arrIndexes[1]);
    movies = this.mapGenres(movies);
    return {
      moreMovies: this.currentPage < this.totalPages,
      movies: movies,
    };
  }

  /**
   * returns the page number for the first movie fetch
   * @param offset
   */
  protected getStartingPage(offset: number): number {
    return Math.ceil((offset > 0 ? offset : 1) / movies_per_page);
  }

  /**
   * Sets the limits in which the final movie array should be cut
   * @param offset
   * @param limit
   */
  protected getArrayLimits(offset: number, limit: number): [number, number] {
    const startIndex = offset - (this.currentPage - 1) * movies_per_page;
    return [startIndex, limit + startIndex];
  }

  /**
   * returns the received movie list with the added genre_names property for every object.
   * @param movies
   */
  protected mapGenres(movies: Movie[]): Movie[] {
    return movies.map((movie) => {
      let genre_names: string[] = [];
      if (movie.genre_ids) {
        genre_names = movie.genre_ids.map((genre) => {
          return eMovieGenre[genre];
        });
      }
      return { ...movie, genre_names };
    });
  }
}
