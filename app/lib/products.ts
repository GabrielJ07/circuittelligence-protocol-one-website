export type SeriesAProduct={code:string;title:string;price:string;category:string;handle:string;shopifyVariantGid:string;};
export const SERIES_A_PRODUCTS:SeriesAProduct[]=[
  {code:"CIVIC-01",title:"Hillcrest Node (Canvas)",price:"$295",category:"Art",handle:"canvas",shopifyVariantGid:"gid://shopify/ProductVariant/42753372192864"},
  {code:"CIVIC-02",title:"North Park Signal (Canvas)",price:"$295",category:"Art",handle:"civic-02-north-park-signal",shopifyVariantGid:"gid://shopify/ProductVariant/42753376321632"},
  {code:"CIVIC-03",title:"University Heights Grid (Canvas)",price:"$295",category:"Art",handle:"civic-03-university-heights-grid",shopifyVariantGid:"gid://shopify/ProductVariant/42753383235680"},
  {code:"RESORT-01",title:"Systems Button Shirt — Titanium",price:"$168",category:"Apparel",handle:"unisex-button-shirt",shopifyVariantGid:"gid://shopify/ProductVariant/42753360265312"},
  {code:"RESORT-01",title:"Systems Button Shirt — Space",price:"$168",category:"Apparel",handle:"unisex-button-shirt-1",shopifyVariantGid:"gid://shopify/ProductVariant/42753361707104"},
  {code:"OPERATOR-01",title:"Oversized Systems Tee",price:"$118",category:"Apparel",handle:"operator-01-oversized-systems-tee",shopifyVariantGid:"gid://shopify/ProductVariant/42753367998560"},
  {code:"FIELD-01",title:"Civic Mesh Short",price:"$128",category:"Apparel",handle:"field-02-civic-mesh-short",shopifyVariantGid:"gid://shopify/ProductVariant/42753371635808"},
  {code:"FIELD-02",title:"Long Athletic Systems Short",price:"$138",category:"Apparel",handle:"field-02-long-athletic-systems-short",shopifyVariantGid:"gid://shopify/ProductVariant/42753367507040"},
  {code:"SIGNAL-01",title:"Civic Signal Bandana",price:"$48",category:"Accessories",handle:"signal-01-civic-signal-bandana",shopifyVariantGid:"gid://shopify/ProductVariant/42753362526304"},
  {code:"TRANSIT-01",title:"Oversized Weekender",price:"$98",category:"Accessories",handle:"transit-01-oversized-weekender",shopifyVariantGid:"gid://shopify/ProductVariant/42753368686688"}
];
export function getProduct(handle:string){return SERIES_A_PRODUCTS.find(p=>p.handle===handle);}
export function isConfiguredVariantId(id:string){return id.startsWith('gid://shopify/ProductVariant/') && !id.includes('REPLACE_WITH_REAL_VARIANT_ID');}
