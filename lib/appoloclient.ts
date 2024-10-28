import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SALEOR_SERVICES,
  cache: new InMemoryCache(),
});

export default client;