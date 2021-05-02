import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Gpx {
    id: ID!
    content: String!
    title: String
  }

  type Query {
    gpx(id: ID!): Gpx!
    gpxs: [Gpx!]!
  }

  type Mutation {
    createGpx(content: String!, title: String): Gpx!
    deleteGpx(id: ID!): ID!
  }
`;

export default typeDefs;
