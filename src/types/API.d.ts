type Movie = {
  popularity: number;
  vote_count: 1712;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  genre_names: string[];
  title: string;
  vote_average: number;
  overview: string;
};

/**
 * Types for discover endpoint in Movie api_key
 */
type SortBy =
  | 'popularity'
  | 'release_date'
  | 'revenue'
  | 'original_title'
  | 'vote_average'
  | 'vote_count';

type SortOrder = 'asc' | 'desc';

type DiscoverOptions = {
  sort_by?: SortBy;
  sort_order?: SortOrder;
  year?: number;
  genres?: eMovieGenre[];
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
