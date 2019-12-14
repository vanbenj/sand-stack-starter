import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';
//import dotenv from 'dotenv';

// TODO get this working to use an environment variable
// set environment variables from ../.env
// dotenv.config({path: '/ui/.env', debug:true});
//
//const GRAPHQL_URI = process.env.GRAPHQL_URI || 'http://localhost:4001/graphql';

const GRAPHQL_URI = 'http://localhost:4001/graphql';

export default new ApolloClient({ uri: GRAPHQL_URI, fetch });
