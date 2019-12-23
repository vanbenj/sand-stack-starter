import fetch from "node-fetch";
import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

let GRAPHQL_URI;
if (typeof location !== "undefined") {
  // hack to prevent ApolloError
  // Network error: Only absolute URLs are supported
  // in browser when reloading pages 
  GRAPHQL_URI = location.protocol + "//" + location.hostname + ":" + location.port + "/graphql";
} else {
  GRAPHQL_URI = "/graphql";
}
console.log("Init ApolloClient " + GRAPHQL_URI);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GRAPHQL_URI,
    fetch
  })
});

export default client;
