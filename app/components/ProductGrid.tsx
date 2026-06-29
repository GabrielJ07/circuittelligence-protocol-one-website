import {ProductCard} from '~/components/ProductCard';
import type {SeriesAProduct} from '~/lib/series-a';

type ShopifyProductCard = Parameters<typeof ProductCard>[0]['product'];

export function ProductGrid({products}: {products: ShopifyProductCard[] | SeriesAProduct[]}) {
  return (
    <section className="product-grid" aria-label="Series-A products">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} />
      ))}
    </section>
  );
}
