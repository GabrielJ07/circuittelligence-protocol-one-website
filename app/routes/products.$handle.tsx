import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {Link, useLoaderData} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {ProductPurchaseForm} from '~/components/ProductPurchaseForm';
import {PRODUCT_QUERY} from '~/graphql/storefront';
import {BRAND, COLLECTION_HANDLE, COMMERCE_LABELS} from '~/lib/brand';
import {getFallbackProduct} from '~/lib/series-a';

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.product?.seo?.title ?? data?.product?.title ?? data?.fallbackProduct?.title ?? BRAND.title},
  {
    name: 'description',
    content: data?.product?.seo?.description ?? data?.product?.description ?? 'Series-A product.',
  },
];

export async function loader({params, context}: LoaderFunctionArgs) {
  const handle = params.handle;

  if (!handle) throw new Response('Product handle is required.', {status: 400});

  let product = null;

  try {
    const result = await context.storefront.query(PRODUCT_QUERY, {
      variables: {handle},
      cache: context.storefront.CacheShort(),
    });
    product = result.product;
  } catch {
    product = null;
  }

  const fallbackProduct = getFallbackProduct(handle);

  if (!product && !fallbackProduct) {
    throw new Response('Product not found.', {status: 404});
  }

  return {product, fallbackProduct};
}

export default function ProductRoute() {
  const {product, fallbackProduct} = useLoaderData<typeof loader>();

  if (!product && fallbackProduct) {
    return (
      <main className="page product-page">
        <section className="product-placeholder large">
          <span>{fallbackProduct.code}</span>
        </section>
        <section className="product-detail">
          <p className="eyebrow">{fallbackProduct.code} / {fallbackProduct.category}</p>
          <h1>{fallbackProduct.title}</h1>
          <p className="price">{fallbackProduct.price}</p>
          <p>Fallback registry view. Live add-to-cart requires the matching Shopify product and variant.</p>
          <Link className="button secondary" to={`/collections/${COLLECTION_HANDLE}`}>
            {COMMERCE_LABELS.continueShopping}
          </Link>
        </section>
      </main>
    );
  }

  if (!product) throw new Response('Product not found.', {status: 404});

  const variants = product.variants.nodes;
  const firstVariant = product.selectedOrFirstAvailableVariant ?? variants[0];

  return (
    <main className="page product-page">
      <section>
        {product.featuredImage ? (
          <Image data={product.featuredImage} aspectRatio="4/5" sizes="(min-width: 900px) 50vw, 100vw" />
        ) : (
          <div className="product-placeholder large"><span>{fallbackProduct?.code ?? 'SERIES-A'}</span></div>
        )}
      </section>

      <section className="product-detail">
        <p className="eyebrow">{fallbackProduct?.code ? `${fallbackProduct.code} / ` : ''}{product.productType}</p>
        <h1>{product.title}</h1>
        {firstVariant?.price ? <p className="price"><Money data={firstVariant.price} /></p> : null}
        {product.description ? <p>{product.description}</p> : null}

        <ProductPurchaseForm variants={variants} productCode={fallbackProduct?.code} />
      </section>
    </main>
  );
}
