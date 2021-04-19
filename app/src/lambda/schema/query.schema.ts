import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    post(id: ID!): Post!
    posts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
  }
`;

export default typeDefs;
