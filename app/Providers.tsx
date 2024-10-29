"use client";
import { Header } from "@/components/Header";
import client from "@/lib/appoloclient";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="px-2 pt-24">{children}</div>
    </ApolloProvider>
  );
};

export default Providers;
