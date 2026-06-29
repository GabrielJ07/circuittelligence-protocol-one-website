export const COLLECTION_QUERY = `#graphql
  query SeriesACollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      seo { title description }
      products(first: 24) {
        nodes {
          id
          title
          handle
          productType
          availableForSale
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 1) { nodes { id availableForSale } }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      availableForSale
      seo { title description }
      featuredImage { url altText width height }
      images(first: 12) { nodes { url altText width height } }
      selectedOrFirstAvailableVariant {
        id
        title
        availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
      }
      variants(first: 100) {
        nodes {
          id
          title
          availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
        }
      }
    }
  }
`;
