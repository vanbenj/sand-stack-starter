import fetch from "node-fetch";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

let GRAPHQL_URI;
if (typeof location !== "undefined") {
  // when running on the client use a relative url
  // since graphql server is proxied
  GRAPHQL_URI = "/graphql";
} else {
  // when running during SSR use graphql server directly
  // this is needed to get Sapper Export working
  require("dotenv").config();
  GRAPHQL_URI = process.env.GRAPHQL_URI;
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GRAPHQL_URI,
    fetch
  })
});

export default client;
