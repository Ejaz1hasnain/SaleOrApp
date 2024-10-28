'use client'
import { ModalLayout } from "@/components/ModalLayout";
import { DeleteProductTypeDocument, GetProductListDocument, Product } from "@/generated/graphql";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ProductList = () => {
  const { push } = useRouter()
  const { data, loading, error, fetchMore } = useQuery(GetProductListDocument, {
    variables: { after: null, first: 10 }
  })
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

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
      <div className="flex flex-row gap-x-2 mb-2">
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

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!!data && data?.products?.edges?.map(({ node: product }: any) => {
          let descriptionText = '';
          try {
            // Check if `product.description` is already an object or needs parsing
            const descriptionData =
              typeof product.description === 'string'
                ? JSON.parse(product.description)
                : product.description;

            // Extract and combine the HTML text from each block
            descriptionText = descriptionData?.blocks
              .map((block: { data: { text: string } }) => block.data.text)
              .join(' ') || '';
          } catch (error) {
            console.error('Error parsing descriptions:', error);
          }

          return (
            <div
              key={product.id}
              className="border rounded-lg cursor-pointer shadow-lg p-4 min-h-40 bg-white hover:shadow-xl transition-shadow"
              onClick={() => push(`/products/${product.id}`)}
            >
              {/* <div className="flex w-full justify-between items-center">
              <FaEdit className="w-6 h-6 text-gray-400 cursor-pointer" />
              <MdDeleteForever className="w-7 h-7 text-red-600 cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setConfirmDeleteModal(true)
                }}
              />
            </div> */}
              <Image
                src={product.thumbnail.url}
                alt={product.name}
                width={256}
                height={256}
                className="w-full"
              />
              <h3 className="text-lg font-semibold mt-2">
                <span className="underline">
                  {product.name}
                </span>
              </h3>
              <p
                className="text-gray-700 mt-1 min-h-24"
                dangerouslySetInnerHTML={{ __html: descriptionText }}
              ></p>
              <span className="text-sm text-gray-500 mt-2 inline-block">
                Category: {product.category.name}
              </span>
            </div>
          );
        })}
        {confirmDeleteModal &&
          <ModalLayout
            isOpen={confirmDeleteModal}
            handleClose={() => { setConfirmDeleteModal(false) }}
            additionalClass={"md:w-[550px] w-auto"}
          >
            <ConfirmDelete product={selectedProduct} handleClose={() => { setConfirmDeleteModal(false) }} />
          </ModalLayout>
        }
      </div>
    </React.Fragment>

  );
};

const ConfirmDelete = ({ product, handleClose }: { product?: Product, handleClose: () => void; }) => {
  if (!product) return null;

  const [deleteProduct, { loading, error }] = useMutation(DeleteProductTypeDocument, {
    variables: { id: product?.id },
    onCompleted: () => {
      handleClose(); // Close the modal
      onProductDeleteSuccess(); // Call another method on success
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  const onProductDeleteSuccess = () => {
  };

  return (
    <div className="flex flex-col p-2 space-y-4 text-sm tracking-widest text-left text-black md:p-4 dark:text-white">
      <div>Are you sure you want to delete?</div>
      <div className="flex flex-row gap-x-2">
        <button
          className="border border-gray-400 bg-transparent text-black w-full p-2 rounded-md flex-1"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          onClick={() => deleteProduct()}
          className="border border-gray-400 bg-orange-400 p-2 text-black rounded-md w-full flex-1"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}

export default ProductList;
