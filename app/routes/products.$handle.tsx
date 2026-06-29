import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {Link, useLoaderData} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {PRODUCT_QUERY} from '~/graphql/storefront';
import {ProductPurchaseForm} from '~/components/ProductForm';
import {FallbackProductNotice} from '~/components/FallbackProductNotice';
import {BRAND, COMMERCE_LABELS, COLLECTION_HANDLE} from '~/lib/brand';
import {getFallbackProduct} from '~/lib/series-a';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const product = data?.product;
  const fallbackProduct = data?.fallbackProduct;

  return [
    {title: product?.seo?.title ?? product?.title ?? fallbackProduct?.title ?? BRAND.title},
    {
      name: 'description',
      content:
        product?.seo?.description ??
        product?.description ??
        fallbackProduct?.description ??
        'Series-A Protocol:01 product.',
    },
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const handle = params.handle;

  if (!handle) {
    throw new Response('Product handle is required.', {status: 400});
  }

  let product = null;

  try {
    const response = await context.storefront.query(PRODUCT_QUERY, {
      variables: {handle},
      cache: context.storefront.CacheShort(),
    });

    product = response.product;
  } catch {
    product = null;
  }

  const fallbackProduct = getFallbackProduct(handle);

  if (!product && !fallbackProduct) {
    throw new Response('Product not found.', {status: 404});
  }

  return {
    product,
    fallbackProduct,
    isFallback: !product,
  };
}

export default function ProductRoute() {
  const {product, fallbackProduct, isFallback} = useLoaderData<typeof loader>();

  if (!product && fallbackProduct) {
    return (
      <main className="product-page">
        <section className="product-media">
          <div className="product-card__placeholder product-card__placeholder--large">
            <span>{fallbackProduct.code}</span>
          </div>
        </section>

        <section className="product-detail">
          <p className="eyebrow">{fallbackProduct.code} / {fallbackProduct.category}</p>
          <h1>{fallbackProduct.title}</h1>
          <p className="product-price">{fallbackProduct.price}</p>
          <p>{fallbackProduct.description}</p>
          <p>{BRAND.pdpSubtagline}</p>

          <FallbackProductNotice />

          <Link className="cta secondary" to={`/collections/${COLLECTION_HANDLE}`}>
            {COMMERCE_LABELS.continueShopping}
          </Link>
        </section>
      </main>
    );
  }

  if (!product) {
    throw new Response('Product not found.', {status: 404});
  }

  const variants = product.variants.nodes;
  const productCode = fallbackProduct?.code;
  const firstVariant = product.selectedOrFirstAvailableVariant ?? variants[0];

  return (
    <main className="product-page">
      <section className="product-media">
        {product.featuredImage ? (
          <Image
            data={product.featuredImage}
            aspectRatio="4/5"
            sizes="(min-width: 900px) 50vw, 100vw"
          />
        ) : (
          <div className="product-card__placeholder product-card__placeholder--large">
            <span>{productCode ?? 'SERIES-A'}</span>
          </div>
        )}
      </section>

      <section className="product-detail">
        <p className="eyebrow">{productCode ? `${productCode} / ` : ''}{product.productType}</p>
        <h1>{product.title}</h1>

        {firstVariant ? (
          <p className="product-price">
            <Money data={firstVariant.price} />
          </p>
        ) : null}

        <p>{product.description || fallbackProduct?.description}</p>
        <p>{BRAND.pdpSubtagline}</p>

        <ProductPurchaseForm variants={variants} productCode={productCode} />
      </section>
    </main>
  );
}
