import {ProductCard} from '~/components/ProductCard';
import {SERIES_A_PRODUCTS} from '~/lib/products';
export default function CollectionRoute(){return <main className="page"><header className="section-head"><p className="eyebrow">Collection</p><h1>Series-A — Protocol:01</h1><p>Product cards include Shopify CartForm buy controls. Replace placeholder variant IDs with real Shopify ProductVariant GIDs.</p></header><section className="grid">{SERIES_A_PRODUCTS.map(p=><ProductCard key={p.code} product={p}/>)}</section></main>}
