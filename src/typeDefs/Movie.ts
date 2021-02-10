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
    overview: String
    cast: [Cast!]
  }

  type CastResult {
    items: [Cast!]
  }

  type MovieList {
    movies: [Movie!]!
    moreMovies: Boolean!
  }

  type Cast {
    name: String!
    adult: Boolean
    gender: Int
    popularity: Int
    profile_path: String
    character: String
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
