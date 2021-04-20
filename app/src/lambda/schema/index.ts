import { gql } from "apollo-server-lambda";

const typeDefs = gql`
  type Xml {
    id: ID!
    content: String!
  }

  type Query {
    xml(id: ID!): Xml!
    xmls: [Xml!]!
  }

  type Mutation {
    createXml(content: String!): Xml!
    deleteXml(id: ID!): ID!
  }
`;

export default typeDefs;
