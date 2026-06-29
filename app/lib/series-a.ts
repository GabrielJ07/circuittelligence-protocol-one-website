export type SeriesAProduct = {
  code: string;
  title: string;
  price: string;
  category: 'Art' | 'Apparel' | 'Accessories';
  handle: string;
  description: string;
  variantId?: string;
};

export const SERIES_A_PRODUCTS: SeriesAProduct[] = [
  {
    code: 'CIVIC-01',
    title: 'Hillcrest Node (Canvas)',
    price: '$295',
    category: 'Art',
    handle: 'hillcrest-node-canvas',
    description:
      'A civic artifact from Series-A. Hillcrest rendered as a human-scale governed system.',
  },
  {
    code: 'CIVIC-02',
    title: 'North Park Signal (Canvas)',
    price: '$295',
    category: 'Art',
    handle: 'north-park-signal-canvas',
    description:
      'A visual signal from the neighborhood grid. Designed as doctrine made visible.',
  },
  {
    code: 'CIVIC-03',
    title: 'University Heights Grid (Canvas)',
    price: '$295',
    category: 'Art',
    handle: 'university-heights-grid-canvas',
    description:
      'A civic grid artifact mapped to the Series-A geography.',
  },
  {
    code: 'RESORT-01',
    title: 'Systems Button Shirt — Titanium',
    price: '$168',
    category: 'Apparel',
    handle: 'systems-button-shirt-titanium',
    description:
      'A structured resort shirt for the operator who still has to move through weather.',
  },
  {
    code: 'RESORT-01',
    title: 'Systems Button Shirt — Space',
    price: '$168',
    category: 'Apparel',
    handle: 'systems-button-shirt-space',
    description:
      'The same system, darker field. Built for the human inside the operating model.',
  },
  {
    code: 'OPERATOR-01',
    title: 'Oversized Systems Tee',
    price: '$118',
    category: 'Apparel',
    handle: 'oversized-systems-tee',
    description:
      'A systems tee with room to think. Engineered for the operator. Worn by the human.',
  },
  {
    code: 'FIELD-01',
    title: 'Civic Mesh Short',
    price: '$128',
    category: 'Apparel',
    handle: 'civic-mesh-short',
    description:
      'Fieldwear for governed movement. Less spectacle. More signal.',
  },
  {
    code: 'FIELD-02',
    title: 'Long Athletic Systems Short',
    price: '$138',
    category: 'Apparel',
    handle: 'long-athletic-systems-short',
    description:
      'A longer field short for the discipline of staying mobile.',
  },
  {
    code: 'SIGNAL-01',
    title: 'Civic Signal Bandana',
    price: '$48',
    category: 'Accessories',
    handle: 'civic-signal-bandana',
    description:
      'A compact civic signal. Pocket-sized order.',
  },
  {
    code: 'TRANSIT-01',
    title: 'Oversized Weekender',
    price: '$98',
    category: 'Accessories',
    handle: 'oversized-weekender',
    description:
      'A transit artifact for bounded movement between neighborhoods.',
  },
];

export function getFallbackProduct(handle: string) {
  return SERIES_A_PRODUCTS.find((product) => product.handle === handle);
}
