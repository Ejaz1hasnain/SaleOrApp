import React from "react";
import ProductList from "./ProductList";

export const ProductsManager = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Products</h2>
      <ProductList />
    </div>
  )
};
