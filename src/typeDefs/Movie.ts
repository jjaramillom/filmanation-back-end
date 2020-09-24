import { gql } from 'apollo-server-express';

export default gql`
  type Movie {
    id: ID!
    title: String!
    genre_ids: [Int!]!
    genre_names: [Genre!]!
    original_title: String
    popularity: Float
    vote_count: Int
    poster_path: String
    vote_average: Float
    release_date: String
  }

  type MovieList {
    movies: [Movie!]!
    moreMovies: Boolean!
  }

  enum SortBy {
    popularity
    release_date
    revenue
    original_title
    vote_average
    vote_count
  }

  enum SortOrder {
    asc
    desc
  }

  enum Genre {
    ACTION
    ADVENTURE
    ANIMATION
    COMEDY
    CRIME
    DOCUMENTARY
    DRAMA
    FAMILY
    FANTASY
    HISTORY
    HORROR
    MUSIC
    MYSTERY
    ROMANCE
    SCIFI
    TV
    THRILLER
    WAR
    WESTERN
  }
`;
