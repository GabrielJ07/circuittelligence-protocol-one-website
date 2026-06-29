import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {useLoaderData} from 'react-router';
import {ProductGrid} from '~/components/ProductGrid';
import {COLLECTION_QUERY} from '~/graphql/storefront';
import {BRAND, COLLECTION_HANDLE} from '~/lib/brand';
import {SERIES_A_PRODUCTS} from '~/lib/series-a';

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.collection?.seo?.title ?? data?.collection?.title ?? BRAND.collectionTitle},
  {name: 'description', content: data?.collection?.seo?.description ?? data?.collection?.description ?? 'Series-A — Protocol:01 collection.'},
];

export async function loader({params, context}: LoaderFunctionArgs) {
  const handle = params.handle ?? COLLECTION_HANDLE;
  try {
    const response = await context.storefront.query(COLLECTION_QUERY, {variables: {handle}, cache: context.storefront.CacheShort()});
    const collection = response.collection;
    return {
      collection,
      products: collection?.products?.nodes?.length ? collection.products.nodes : SERIES_A_PRODUCTS,
      isFallback: !collection,
    };
  } catch {
    return {collection: null, products: SERIES_A_PRODUCTS, isFallback: true};
  }
}

export default function CollectionRoute() {
  const {collection, products, isFallback} = useLoaderData<typeof loader>();
  return (
    <main className="page">
      <header className="section-head">
        <p className="eyebrow">Collection</p>
        <h1>{collection?.title ?? BRAND.collectionTitle}</h1>
        {isFallback ? <p>Fallback Series-A registry is displayed until Shopify collection data resolves.</p> : collection?.description ? <p>{collection.description}</p> : null}
      </header>
      <ProductGrid products={products} />
    </main>
  );
}
