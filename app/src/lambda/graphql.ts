import { ApolloServer } from "apollo-server-lambda";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { models } from "./models";
import { startDB } from "./utils/start-db";
import { promisify } from "es6-promisify";

/* export const handler = async (event, context) => {
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
}; */

let conn: Promise<void> = null;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { models };
  },
  introspection: true,
  playground: true,
});
const graphQLHandler = server.createHandler();

exports.handler = (event, context, callback) => {
  // re-using `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;
  if (conn == null) {
    conn = startDB();
  }
  conn.then(() => graphQLHandler(event, context, callback));
};

// https://github.com/apollographql/apollo-server/issues/2136#issuecomment-581209097
/* exports.graphql = async (event, lambdaContext, callback) => {
  await startDB();
  // Playground handler
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
      return { models };
    },
    introspection: true,
    playground: true,
  });
  if (event.httpMethod === "GET") {
    server.createHandler()(
      { ...event, path: event.requestContext.path || event.path },
      lambdaContext,
      callback
    );
  } else {
    server.createHandler()(event, lambdaContext, callback);
  }
};
 */

//https://github.com/pushkar8723/apollo-graphql-typescript
//https://www.apollographql.com/docs/apollo-server/deployment/netlify/
//https://khalilstemmler.com/blogs/graphql/serverless-graphql-typescript/
