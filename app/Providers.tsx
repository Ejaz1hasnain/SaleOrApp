"use client";
import client from "@/lib/appoloclient";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <ApolloProvider client={client}>
      <div className="p-2">{children}</div>
    </ApolloProvider>
  );
};

export default Providers;
