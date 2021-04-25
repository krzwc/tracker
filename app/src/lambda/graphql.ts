import { ApolloServer } from "apollo-server-lambda";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { models } from "./models";
import { startDB } from "./utils/start-db";
import {
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult,
  Callback,
} from "aws-lambda";

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

const graphQLHandler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});

type HandlerFunction = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => void;

export const handler: HandlerFunction = (event, context, callback) => {
  if (Object.keys(event.headers).includes("Content-Type")) {
    event.headers["content-type"] = event.headers["Content-Type"];
  }

  if (
    event.isBase64Encoded &&
    event.body &&
    !event.headers["content-type"].includes("multipart/form-data")
  ) {
    event = {
      ...event,
      body: Buffer.from(event.body, "base64").toString(),
      isBase64Encoded: false,
    };
    console.log(event);
  }
  // re-using `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;
  if (conn == null) {
    conn = startDB();
  }
  conn.then(
    () =>
      graphQLHandler(event, context, callback) as
        | APIGatewayProxyResult
        | PromiseLike<APIGatewayProxyResult>
  );
};

//https://github.com/pushkar8723/apollo-graphql-typescript
//https://www.apollographql.com/docs/apollo-server/deployment/netlify/
//https://khalilstemmler.com/blogs/graphql/serverless-graphql-typescript/
