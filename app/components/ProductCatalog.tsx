import {ProductCard} from '~/components/ProductCard';
import type {DepartmentProduct} from '~/lib/department';

export function ProductCatalog({products}: {products: DepartmentProduct[]}) {
  if (!products.length) {
    return (
      <div className="product-catalog product-catalog--empty">
        <p>No payloads currently deployed in this department.</p>
      </div>
    );
  }

  return (
    <div className="product-catalog">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
