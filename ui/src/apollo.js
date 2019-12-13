import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';

// TODO: Put in .env file
const GQL_SERVER_ENDPOINT = 'http://localhost:4001/graphql';

export default new ApolloClient({ uri: GQL_SERVER_ENDPOINT, fetch });
