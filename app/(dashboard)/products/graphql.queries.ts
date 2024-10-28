import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(
      first: 10
      channel: "default-channel"
      where: { minimalPrice: { range: { gte: 10, lte: 100 } } }
    ) {
      edges {
        node {
          id
          name
          description
          thumbnail {
            url
          }
          category {
            id
            name
          }
        }
      }
    }
  }
`;


export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($id: ID!) {
    product(id: $id, channel: "default-channel") {
      id
      name
      description
      seoTitle
      seoDescription
      availableForPurchaseAt
      created
      isAvailable(address: { country: US })
      category {
        id
        name
      }
      thumbnail {
        url
      }
    }
  }
`;