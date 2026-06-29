import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {DepartmentProductFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {NewsletterForm} from '~/components/NewsletterForm';

export function InventoryGrid({
  products,
}: {
  products: DepartmentProductFragment[];
}) {
  return (
    <section className="inventory-grid">
      {products.slice(0, 8).map((product) => (
        <InventoryTile key={product.id} product={product} />
      ))}
      <div className="inventory-grid__item inventory-grid__item--newsletter">
        <NewsletterForm />
      </div>
    </section>
  );
}

function InventoryTile({product}: {product: DepartmentProductFragment}) {
  const url = useVariantUrl(product.handle);
  return (
    <Link to={url} className="inventory-grid__item">
      {product.featuredImage && (
        <Image
          data={product.featuredImage}
          aspectRatio="1/1"
          sizes="(min-width: 45em) 33vw, 100vw"
        />
      )}
      <div className="inventory-grid__info">
        <span>{product.title}</span>
        <Money data={product.priceRange.minVariantPrice} />
      </div>
    </Link>
  );
}
