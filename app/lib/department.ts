export const DEPARTMENT_PRODUCT_FRAGMENT = `#graphql
  fragment DepartmentProductMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment DepartmentProduct on Product {
    id
    handle
    title
    description
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 4) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        ...DepartmentProductMoney
      }
    }
    features: metafield(namespace: "protocol", key: "features") {
      value
    }
    variants(first: 16) {
      nodes {
        id
        title
        availableForSale
        image {
          id
          url
          altText
          width
          height
        }
        selectedOptions {
          name
          value
        }
        price {
          ...DepartmentProductMoney
        }
      }
    }
  }
` as const;

export const DEPARTMENT_QUERY = `#graphql
  ${DEPARTMENT_PRODUCT_FRAGMENT}
  query Department(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
        width
        height
      }
      products(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
      ) {
        nodes {
          ...DepartmentProduct
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;

export const SERIES_A_COLLECTION_ID = 'gid://shopify/Collection/291819716704';

export const SERIES_A_COLLECTION_QUERY = `#graphql
  ${DEPARTMENT_PRODUCT_FRAGMENT}
  query SeriesACollection(
    $id: ID!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
  ) @inContext(country: $country, language: $language) {
    collection(id: $id) {
      id
      handle
      title
      description
      image {
        id
        url
        altText
        width
        height
      }
      products(first: $first) {
        nodes {
          ...DepartmentProduct
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;

import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';

export interface DepartmentMoney {
  amount: string;
  currencyCode: CurrencyCode;
}

export interface DepartmentImage {
  id: string;
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface DepartmentVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  image: DepartmentImage | null;
  selectedOptions: Array<{name: string; value: string}>;
  price: DepartmentMoney;
}

export interface DepartmentProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: DepartmentImage | null;
  images: {nodes: DepartmentImage[]};
  priceRange: {minVariantPrice: DepartmentMoney};
  features: {value: string} | null;
  variants: {nodes: DepartmentVariant[]};
}

export interface DepartmentCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: DepartmentImage | null;
  products: {
    nodes: DepartmentProduct[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      endCursor: string | null;
      startCursor: string | null;
    };
  };
}

export const SIZE_CHIPS = ['XS', 'S', 'M', 'L', 'XL'];

const SIZE_ALIASES: Record<string, string> = {
  'extra small': 'XS',
  xs: 'XS',
  small: 'S',
  s: 'S',
  medium: 'M',
  m: 'M',
  large: 'L',
  l: 'L',
  'extra large': 'XL',
  'x-large': 'XL',
  xl: 'XL',
};

export function normalizeSize(value: string): string {
  return SIZE_ALIASES[value.trim().toLowerCase()] ?? value.trim().toUpperCase();
}

export const SERIES_A_TAGLINES: Record<string, string> = {
  'CIVIC-01':
    'Your neighborhood looked this good before the construction barriers too.',
  'CIVIC-02':
    'Proof that the future has neighborhoods — and this one has better coffee.',
  'CIVIC-03':
    "48 inches of deterministic beauty. The algorithm didn't pick this street. You did.",
  'FIELD-02': "Circuits don't run in straight lines. Neither should you.",
  'SIGNAL-01':
    'Phi-ratio construction. Because even your face deserves governed intelligence.',
  'TRANSIT-01': 'Carry what matters. Leave the black boxes behind.',
  'FIELD-01':
    'Recycled synthetic. Deterministic design. Your weekend is now observable.',
  'RESORT-01':
    "Six placement prints. Zero hallucinations. You're the only model that matters here.",
  'OPERATOR-01':
    'The machine proposed the design. You approved it. That’s the whole doctrine.',
};

export function getSeriesATagline(title: string): string | null {
  const codename = title.split('//')[0]?.trim().toUpperCase();
  return codename ? SERIES_A_TAGLINES[codename] ?? null : null;
}

export function parseFeatureBullets(value?: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // not JSON, fall through to line/comma splitting
  }
  return value
    .split(/\r?\n|,/)
    .map((line) => line.trim())
    .filter(Boolean);
}
