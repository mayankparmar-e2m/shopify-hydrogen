import gql from "graphql-tag";

export const  PRODUCT_PAGE_QUERY=gql`
fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    quantityAvailable
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
}
query Product($handle: String) {
  product(handle: $handle) {
    availableForSale
    description
    descriptionHtml
    featuredImage {
      width
      url
      id
      height
      altText
    }
    handle
    id
    images(first: 25) {
      nodes {
        width
        url
        id
        height
        altText
      }
    }
    isGiftCard
    onlineStoreUrl
    options {
      name
      values
      id
    }
    productType
    seo {
      description
      title
    }
    tags
    title
    totalInventory
    vendor
    variants(first: 10) {
      nodes {
        ...ProductVariant
      }
    }
  }
}

`



