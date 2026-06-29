import {ProductCard} from '~/components/ProductCard';

type Product = Parameters<typeof ProductCard>[0]['product'];

export function ProductGrid({products}: {products: Product[]}) {
  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} />
      ))}
    </section>
  );
}
