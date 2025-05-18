import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { pool } from "@/lib/db";
import { merge } from "lodash";
import { UserMutationResolves } from "@/graphql/UserWebResolves/MutationResolves";
import { UserQueryResolves } from "@/graphql/UserWebResolves/QueryResolves";
const resolvers = merge(UserMutationResolves, UserQueryResolves);
import MergeTypeDefs from "@/graphql/schema/mergeTypeDefs";
const server = new ApolloServer({
  typeDefs: MergeTypeDefs,
  resolvers: resolvers,
  introspection: true, 
});

export const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ db: pool }),
});

export { handler as GET, handler as POST };
