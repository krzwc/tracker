import { ApolloServer } from "apollo-server-lambda";
import resolvers from "./resolvers";
import typeDefs from "./schema/query.schema";
import { models } from "./models";
import { startDB } from "./utils/start-db";

export const start = async () => {
  try {
    await startDB();
  } catch (e) {
    console.error(e);
  }
};
start();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { models };
  },
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
