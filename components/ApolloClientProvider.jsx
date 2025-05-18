"use client"

import { client } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function ApolloClientProvider({children}){
    return(
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}