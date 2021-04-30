import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import App from "./App";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "/.netlify/functions/graphql",
});
const client = new ApolloClient({ cache, link });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
