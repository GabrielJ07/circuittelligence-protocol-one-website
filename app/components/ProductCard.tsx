import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {SeriesAProduct} from '~/lib/series-a';
import {COMMERCE_LABELS} from '~/lib/brand';

type ShopifyProductCard = {
  id: string;
  title: string;
  handle: string;
  productType?: string | null;
  availableForSale?: boolean;
  featuredImage?: {
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export function ProductCard({
  product,
}: {
  product: ShopifyProductCard | SeriesAProduct;
}) {
  const isShopifyProduct = 'id' in product;
  const handle = product.handle;
  const title = product.title;
  const productType = isShopifyProduct ? product.productType : product.category;
  const isAvailable = isShopifyProduct ? product.availableForSale : true;

  return (
    <article className="product-card">
      <Link to={`/products/${handle}`}>
        {'featuredImage' in product && product.featuredImage ? (
          <Image
            data={product.featuredImage}
            aspectRatio="4/5"
            sizes="(min-width: 900px) 25vw, 100vw"
          />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true">
            <span>{'code' in product ? product.code : 'SERIES-A'}</span>
          </div>
        )}

        <div className="product-card__body">
          <p className="eyebrow">{productType}</p>
          <h3>{title}</h3>
          <div className="product-card__meta">
            <span>
              {isShopifyProduct && product.priceRange ? (
                <Money data={product.priceRange.minVariantPrice} />
              ) : 'price' in product ? (
                product.price
              ) : null}
            </span>
            <span>{isAvailable ? COMMERCE_LABELS.inStock : COMMERCE_LABELS.soldOut}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
