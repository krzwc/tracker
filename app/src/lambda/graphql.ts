import { ApolloServer } from "apollo-server-lambda";
import resolvers from "./resolvers";
import typeDefs from "./schema/query.schema";
import { models } from "./models";
import { startDB } from "./utils/start-db";
import { promisify } from "es6-promisify";

export const handler = async (event, context) => {
  try {
    await startDB();
  } catch (e) {
    console.error(e);
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
      return { models };
    },
    introspection: true,
    playground: true,
  });

  const handler = promisify(
    server.createHandler({
      cors: {
        origin: "*",
        credentials: true,
      },
    })
  );
  return handler(event, context);
};
