// Here we import the graphql client
import client from "../_apollo.js";
import { gql } from "apollo-boost";
import devalue from "devalue";

const GET_USERS = gql`
  query getUsers {
    User {
      name
      reviews(orderBy: stars_desc) {
        date {
          formatted
        }
        stars
        business {
          name
        }
        text
      }
    }
  }
`;

export async function get(req, res, next) {
  const users = await client.query({
    query: GET_USERS
  });
  if (users !== null) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users.data));
  } else {
    next();
  }
}
