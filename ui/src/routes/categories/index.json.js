// Here we import the graphql client
import client from "../_apollo.js";
import { gql } from "apollo-boost";

const GET_CATEGORIES = gql`
  query getCategories {
    Category(orderBy: name_asc) {
      name
    }
  }
`;

export async function get(req, res, next) {
  const categories = await client.query({
    query: GET_CATEGORIES
  });
  if (categories !== null) {
    res.setHeader("Content-Type", "application/json");
    const json = JSON.stringify(categories.data);
    res.end(json);
  } else {
    next();
  }
}
