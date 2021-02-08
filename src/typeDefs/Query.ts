import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    movie(id: String!): Movie!
    movieSearch(query: String!, offset: Int, limit: Int): MovieList!
    movieDiscover(
      sort_by: SortBy
      sort_order: SortOrder
      year: String
      genres: [Genre!]
      offset: Int
      limit: Int
    ): MovieList!
  }
`;
