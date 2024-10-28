'use client'
import React from "react";
import { ProductDetails } from "./ProductDetails";
import { Product, useGetProductDetailsQuery } from "@/generated/graphql";
import { use } from 'react';

const ProductPage = (props: any) => {
  const params = use(props?.params) as { id: string };
  const decodedId = decodeURIComponent(params.id);

  const { data, error, loading } = useGetProductDetailsQuery({
    variables: { id: decodedId }
  });

  if (loading) return <div className="text-center justify-center">Loading...</div>;
  if (error) return <div className="text-center justify-center">Error: {error.message}</div>;

  return data?.product && (
    <ProductDetails productDetails={data.product as Product} />
  )
};

export default ProductPage;