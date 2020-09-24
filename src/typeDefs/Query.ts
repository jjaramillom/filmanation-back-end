import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    movie(id: String!): Movie!
    movies(query: String!, offset: Int, limit: Int): MovieList!
  }
`;
