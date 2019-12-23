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
    let category = req.params.name;
    const busnisses = await client.query({
        query: GET_BUSINESSES
    }).refetch({
    filter: {
        categories_single: {
        name: category
        }
    }
    });
	if (users !== null) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({businesses: businesses.data, category}));
	} else {
		next();
	}
}