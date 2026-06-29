import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {SeriesAProduct} from '~/lib/series-a';
import {COMMERCE_LABELS} from '~/lib/brand';

type ShopifyProductCard = {
  id: string;
  title: string;
  handle: string;
  productType?: string | null;
  availableForSale?: boolean | null;
  featuredImage?: {url: string; altText?: string | null; width?: number | null; height?: number | null} | null;
  priceRange?: {minVariantPrice: {amount: string; currencyCode: string}};
};

export function ProductCard({product}: {product: ShopifyProductCard | SeriesAProduct}) {
  const isLive = 'id' in product;
  const displayType = isLive ? product.productType : product.category;
  const available = isLive ? Boolean(product.availableForSale) : true;

  return (
    <article className="product-card">
      <Link to={`/products/${product.handle}`}>
        {isLive && product.featuredImage ? (
          <Image data={product.featuredImage} aspectRatio="4/5" sizes="(min-width: 980px) 25vw, 100vw" />
        ) : (
          <div className="product-placeholder" aria-hidden="true">
            <span>{'code' in product ? product.code : 'SERIES-A'}</span>
          </div>
        )}
        <div className="product-card-body">
          <p className="eyebrow">{displayType}</p>
          <h3>{product.title}</h3>
          <p className="product-meta">
            <span>{isLive && product.priceRange ? <Money data={product.priceRange.minVariantPrice} /> : 'price' in product ? product.price : null}</span>
            <span>{available ? COMMERCE_LABELS.inStock : COMMERCE_LABELS.soldOut}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
