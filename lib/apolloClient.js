import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
require("dotenv").config();
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

export const client = new ApolloClient({
  httpLink,
  cache: new InMemoryCache(),
});
