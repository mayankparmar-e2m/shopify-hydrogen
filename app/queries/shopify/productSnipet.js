import gql from 'graphql-tag';

export const PRODUCT_SNIPET_QUERY = gql`
  query Collection($handle: String, $maxProduct: Int) {
    collection(handle: $handle) {
      handle
      id
      products(first: $maxProduct) {
        nodes {
          id
          availableForSale
          handle
          title
          totalInventory
          featuredImage {
            altText
            height
            id
            url
            width
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 99) {
            nodes {
              availableForSale
              compareAtPrice {
                amount
                currencyCode
              }
              id
              image {
                altText
                height
                id
                url
                width
              }
              price {
                amount
                currencyCode
              }
              quantityAvailable
              sku
              title
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;
