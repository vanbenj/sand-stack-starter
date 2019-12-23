// Here we import the graphql client
import client from "../_apollo.js";
import { gql } from "apollo-boost";
import devalue from 'devalue';

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
    console.log("query users");
    const users = await client.query({
        query: GET_USERS
    });
    console.log(devalue(users.data));
	if (users !== null) {
        res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
		res.end(devalue(users.data));
	} else {
		next();
	}
}