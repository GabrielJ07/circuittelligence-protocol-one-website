import {ProductCard} from '~/components/ProductCard';
type ProductCardData = Parameters<typeof ProductCard>[0]['product'];
export function ProductGrid({products}: {products: ProductCardData[]}) {
  return <section className="product-grid" aria-label="Series-A products">{products.map((product) => <ProductCard key={product.handle} product={product} />)}</section>;
}
