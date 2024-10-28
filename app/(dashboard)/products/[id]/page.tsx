'use client';
import React from "react";
import { ProductDetails } from "./ProductDetails";
import { Product, useGetProductDetailsQuery } from "@/generated/graphql";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const decodedId = decodeURIComponent(params.id);

  const { data, error, loading } = useGetProductDetailsQuery({
    variables: { id: decodedId }
  });

  if (loading) return <div className="text-center justify-center">Loading...</div>;
  if (error) return <div className="text-center justify-center">Error: {error.message}</div>;

  return data?.product ? (
    <ProductDetails productDetails={data.product as Product} />
  ) : (
    <div className="text-center justify-center">Product not found</div>
  );
};

export default ProductPage;
