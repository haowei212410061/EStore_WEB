import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export const client = new ApolloClient({
  httpLink,
  cache: new InMemoryCache(),
});
