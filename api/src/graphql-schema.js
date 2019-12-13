import { neo4jgraphql } from 'neo4j-graphql-js';
import fs from 'fs';
import path from 'path';

/*
 * Check for GRAPHQL_SCHEMA environment variable to specify schema file
 * fallback to schema.graphql if GRAPHQL_SCHEMA environment variable is not set
 */

export const typeDefs = fs
  .readFileSync(
    process.env.GRAPHQL_SCHEMA || path.join(__dirname, 'schema.graphql')
  )
  .toString('utf-8');

export const resolvers = {
  // root entry point to GraphQL service
  Query: {
    usersBySubstring(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    usersxx(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    }
  }
};
