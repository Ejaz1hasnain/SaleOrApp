'use client';
import React from "react";
import { ProductDetails } from "./ProductDetails";
import { use } from 'react';
import { Spinner } from "@/components/Spinner";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const decodedId = decodeURIComponent(resolvedParams.id);

  return (
    <React.Suspense fallback={<Spinner />}>
      <ProductDetails decodedId={decodedId} />
    </React.Suspense>
  )
};

export default ProductPage;
