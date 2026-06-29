import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {useLoaderData} from 'react-router';
import {ProductGrid} from '~/components/ProductGrid';
import {COLLECTION_QUERY} from '~/graphql/storefront';
import {BRAND, COLLECTION_HANDLE} from '~/lib/brand';
import {SERIES_A_PRODUCTS} from '~/lib/series-a';

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.collection?.seo?.title ?? data?.collection?.title ?? BRAND.collectionTitle},
  {
    name: 'description',
    content: data?.collection?.seo?.description ?? data?.collection?.description ?? 'Series-A — Protocol:01 collection.',
  },
];

export async function loader({params, context}: LoaderFunctionArgs) {
  const handle = params.handle ?? COLLECTION_HANDLE;

  try {
    const result = await context.storefront.query(COLLECTION_QUERY, {
      variables: {handle},
      cache: context.storefront.CacheShort(),
    });

    return {
      collection: result.collection,
      products: result.collection?.products?.nodes?.length ? result.collection.products.nodes : SERIES_A_PRODUCTS,
      isFallback: !result.collection,
    };
  } catch {
    return {
      collection: null,
      products: SERIES_A_PRODUCTS,
      isFallback: true,
    };
  }
}

export default function CollectionRoute() {
  const {collection, products, isFallback} = useLoaderData<typeof loader>();

  return (
    <main className="page">
      <header className="section-head">
        <p className="eyebrow">Collection</p>
        <h1>{collection?.title ?? BRAND.collectionTitle}</h1>
        {isFallback ? (
          <p>Rendering fallback Series-A registry. Live purchasing activates when matching Shopify products are connected.</p>
        ) : (
          <p>{collection?.description}</p>
        )}
      </header>

      <ProductGrid products={products} />
    </main>
  );
}
