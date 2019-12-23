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
    const users = await client.query({
        query: GET_CATEGORIES
    });
	if (users !== null) {
		res.setHeader('Content-Type', 'application/json');
    const json = JSON.stringify(users.data);
    console.log(json);
		res.end(json);
	} else {
		next();
	}
}