// Here we import the graphql client
import client from "../_apollo.js";
import { gql } from "apollo-boost";

const GET_BUSINESSES = gql`
  query getBusinesses($filter: _BusinessFilter) {
    Business(filter: $filter, orderBy: avgStars_desc) {
      name
      address
      avgStars
    }
  }
`;

export async function get(req, res, next) {
  let category = req.params.category;
  const businesses = await client.query({
    query: GET_BUSINESSES,
    variables: {
      filter: {
        categories_single: {
          name: category
        }
      }
    }
  });
  if (businesses !== null) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(businesses.data));
  } else {
    next();
  }
}
