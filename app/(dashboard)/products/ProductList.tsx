'use client'
import { GetProductListDocument } from "@/generated/graphql";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductNode {
  id: string;
  name: string;
  description: string | object; // Adjust this if you have a specific structure
  thumbnail: {
    url: string;
  };
  category: {
    name: string;
  };
}

interface ProductEdge {
  node: ProductNode;
}

interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  startCursor: string | null;
  hasPreviousPage: boolean;
}

interface ProductsData {
  products: {
    edges: ProductEdge[];
    pageInfo: PageInfo;
  };
}

const ProductList = () => {
  const { push } = useRouter()
  const { data, loading, fetchMore } = useQuery<ProductsData>(GetProductListDocument, {
    variables: { after: null, first: 10 }
  })

  const fetchNext = () => {
    const endCursor = data?.products?.pageInfo?.endCursor;
    if (data?.products?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: endCursor, first: 10, before: null, last: null },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            products: {
              ...fetchMoreResult.products,
              edges: [
                ...fetchMoreResult.products.edges
              ]
            }
          }
        }
      })
    }
  }
  const fetchPrev = () => {
    const startCursor = data?.products?.pageInfo?.startCursor;
    if (data?.products?.pageInfo?.hasPreviousPage) {
      fetchMore({
        variables: { before: startCursor, last: 10, after: null, first: null },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            products: {
              ...fetchMoreResult.products,
              edges: [
                ...fetchMoreResult.products.edges
              ]
            }
          }
        }
      })
    }
  }

  return (
    <React.Fragment>
      {data && <div className="flex flex-row gap-x-2 mb-2">
        <button
          className="border border-gray-400 bg-transparent disabled:cursor-not-allowed disabled:bg-gray-500 text-black w-full p-2 rounded-md flex-1"
          onClick={fetchPrev}
          disabled={loading || !data?.products?.pageInfo?.hasPreviousPage}
        >
          {loading ? "Fetching..." : "Prev"}
        </button>
        <button
          onClick={fetchNext}
          className="border border-gray-400 bg-orange-400 disabled:cursor-not-allowed disabled:bg-gray-500 p-2 text-black rounded-md w-full flex-1"
          disabled={!data?.products?.pageInfo?.hasNextPage ?? true}
        >
          {loading ? "Fetching..." : "Next"}
        </button>
      </div>
      }

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!!data && data?.products?.edges?.map((product: ProductEdge) => {
          let descriptionText = '';
          try {
            // Check if `product.description` is already an object or needs parsing
            const descriptionData =
              typeof product.node.description === 'string'
                ? JSON.parse(product.node.description)
                : product.node.description;

            // Extract and combine the HTML text from each block
            descriptionText = descriptionData?.blocks
              .map((block: { data: { text: string } }) => block.data.text)
              .join(' ') || '';
          } catch (error) {
            console.error('Error parsing descriptions:', error);
          }

          return (
            <div
              key={product.node.id}
              className="border rounded-lg cursor-pointer shadow-lg p-4 min-h-40 bg-white hover:shadow-xl transition-shadow"
              onClick={() => push(`/products/${product.node.id}`)}
            >
              <Image
                src={product.node.thumbnail.url}
                alt={product.node.name}
                width={256}
                height={256}
                className="w-full"
              />
              <h3 className="text-lg font-semibold mt-2">
                <span className="underline">
                  {product.node.name}
                </span>
              </h3>
              <p
                className="text-gray-700 mt-1 min-h-24"
                dangerouslySetInnerHTML={{ __html: descriptionText }}
              ></p>
              <span className="text-sm text-gray-500 mt-2 inline-block">
                Category: {product.node.category.name}
              </span>
            </div>
          );
        })}
      </div>
    </React.Fragment>

  );
};

export default ProductList;
