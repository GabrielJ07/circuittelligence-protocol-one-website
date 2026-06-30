import {Link} from 'react-router';
import {BuyButton} from '~/components/BuyButton';
import type {SeriesAProduct} from '~/lib/products';
import {isConfiguredVariantId} from '~/lib/products';

export function ProductCard({product}:{product:SeriesAProduct}) {
  const configured=isConfiguredVariantId(product.shopifyVariantGid);
  return <article className="card">
    <Link className="product-art" to={`/products/${product.handle}`}><span>{product.code}</span></Link>
    <div className="card-body">
      <p className="eyebrow">{product.category}</p><h3><Link to={`/products/${product.handle}`}>{product.title}</Link></h3><p className="price">{product.price}</p>
      <BuyButton merchandiseId={product.shopifyVariantGid} productCode={product.code} disabledReason={configured?undefined:'Replace this placeholder with a real Shopify ProductVariant GID.'}/>
    </div>
  </article>;
}
