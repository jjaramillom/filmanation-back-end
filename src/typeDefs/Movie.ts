import { gql } from 'apollo-server-express';

export default gql`
  type Movie {
    id: ID!
    title: String!
    genres: [String!]!
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
`;
