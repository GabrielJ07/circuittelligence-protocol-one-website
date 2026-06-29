import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {DepartmentProductFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductCarousel({
  products,
}: {
  products: DepartmentProductFragment[];
}) {
  if (!products.length) return null;
  const [featured, ...rail] = products;

  return (
    <section className="product-carousel">
      <FeaturedTile product={featured} />
      <div className="product-carousel__rail">
        {rail.map((product) => (
          <RailTile key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function FeaturedTile({product}: {product: DepartmentProductFragment}) {
  const url = useVariantUrl(product.handle);
  return (
    <Link to={url} className="product-carousel__featured">
      {product.featuredImage && (
        <Image
          data={product.featuredImage}
          sizes="(min-width: 45em) 66vw, 100vw"
          aspectRatio="4/5"
        />
      )}
      <div className="product-carousel__featured-info">
        <h3>{product.title}</h3>
        <Money data={product.priceRange.minVariantPrice} />
      </div>
    </Link>
  );
}

function RailTile({product}: {product: DepartmentProductFragment}) {
  const url = useVariantUrl(product.handle);
  return (
    <Link to={url} className="product-carousel__rail-item">
      {product.featuredImage && (
        <Image
          data={product.featuredImage}
          sizes="200px"
          aspectRatio="1/1"
          width={120}
          height={120}
        />
      )}
      <div className="product-carousel__rail-info">
        <span>{product.title}</span>
        <Money data={product.priceRange.minVariantPrice} />
      </div>
    </Link>
  );
}
