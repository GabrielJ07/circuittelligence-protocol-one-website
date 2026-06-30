export type SeriesAProduct = {
  code: string;
  title: string;
  price: string;
  category: string;
  handle: string;
};

export const SERIES_A_PRODUCTS: SeriesAProduct[] = [
  {
    "code": "CIVIC-01",
    "title": "Hillcrest Node (Canvas)",
    "price": "$295",
    "category": "Art",
    "handle": "canvas"
  },
  {
    "code": "CIVIC-02",
    "title": "North Park Signal (Canvas)",
    "price": "$295",
    "category": "Art",
    "handle": "north-park-signal-canvas"
  },
  {
    "code": "CIVIC-03",
    "title": "University Heights Grid (Canvas)",
    "price": "$295",
    "category": "Art",
    "handle": "university-heights-grid-canvas"
  },
  {
    "code": "RESORT-01",
    "title": "Systems Button Shirt — Titanium",
    "price": "$168",
    "category": "Apparel",
    "handle": "systems-button-shirt-titanium"
  },
  {
    "code": "RESORT-01",
    "title": "Systems Button Shirt — Space",
    "price": "$168",
    "category": "Apparel",
    "handle": "systems-button-shirt-space"
  },
  {
    "code": "OPERATOR-01",
    "title": "Oversized Systems Tee",
    "price": "$118",
    "category": "Apparel",
    "handle": "oversized-systems-tee"
  },
  {
    "code": "FIELD-01",
    "title": "Civic Mesh Short",
    "price": "$128",
    "category": "Apparel",
    "handle": "civic-mesh-short"
  },
  {
    "code": "FIELD-02",
    "title": "Long Athletic Systems Short",
    "price": "$138",
    "category": "Apparel",
    "handle": "long-athletic-systems-short"
  },
  {
    "code": "SIGNAL-01",
    "title": "Civic Signal Bandana",
    "price": "$48",
    "category": "Accessories",
    "handle": "civic-signal-bandana"
  },
  {
    "code": "TRANSIT-01",
    "title": "Oversized Weekender",
    "price": "$98",
    "category": "Accessories",
    "handle": "oversized-weekender"
  }
];

export function getFallbackProduct(handle: string) {
  return SERIES_A_PRODUCTS.find((product) => product.handle === handle);
}
