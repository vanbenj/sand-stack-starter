import fetch from "node-fetch";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import dotenv from "dotenv";

dotenv.config();
const GRAPHQL_URI = process.env.GRAPHQL_URI || "http://localhost:4001/graphql";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: GRAPHQL_URI,
  fetch
});

export default new ApolloClient({
  cache,
  link
});
