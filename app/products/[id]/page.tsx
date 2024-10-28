'use client';
import React from "react";
import { ProductDetails } from "./ProductDetails";
import { Product, useGetProductDetailsQuery } from "@/generated/graphql";
import { use } from 'react';
import { Spinner } from "@/components/Spinner";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const decodedId = decodeURIComponent(resolvedParams.id);

  const { data, error, loading } = useGetProductDetailsQuery({
    variables: { id: decodedId }
  });

  if (loading) return <div className="text-center justify-center"><Spinner /></div>;
  if (error) return <div className="text-center justify-center">Error: {error.message}</div>;

  return data?.product ? (
    <ProductDetails productDetails={data.product as Product} />
  ) : (
    <div className="text-center justify-center">Product not found</div>
  );
};

export default ProductPage;
