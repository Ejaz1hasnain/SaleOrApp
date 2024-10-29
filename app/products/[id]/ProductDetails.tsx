import { GetProductDetailsDocument, Product } from "@/generated/graphql";
import { useSuspenseQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

type ProductDetails = {
  product: Product
}

export const ProductDetails = ({ decodedId }: { decodedId: string }) => {
  const { data, error } = useSuspenseQuery<ProductDetails>(GetProductDetailsDocument, {
    variables: { id: decodedId }
  });
  const { back } = useRouter();
  const { name, description, category, isAvailable, thumbnail } = data?.product;

  // Parse the description from JSON string
  const parsedDescription = typeof description === 'string' ?
    JSON?.parse(description)?.blocks[0]?.data?.text :
    description;

  if (error) return <div className="text-center justify-center">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <IoMdArrowBack className="h-6 w-6 text-gray-600 mr-2 cursor-pointer" onClick={() => back()} />
        <h2 className="text-3xl font-bold">Product Details</h2>
      </div>
      <div className="flex flex-col md:flex-row mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="md:w-1/2">
          <Image
            src={thumbnail?.url ?? ""}
            alt={name}
            width={256}
            height={256}
            className="w-full"
          />
        </div>
        <div className="md:w-1/2 md:pl-6 my-auto">
          <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600 my-4" dangerouslySetInnerHTML={{ __html: parsedDescription }} />
          <div className="flex items-center justify-between mt-6">
            <span className="text-lg text-gray-700">{category?.name}</span>
            <span className={`text-lg font-semibold ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
              {isAvailable ? 'Available' : 'Out of Stock'}
            </span>
          </div>
          <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
