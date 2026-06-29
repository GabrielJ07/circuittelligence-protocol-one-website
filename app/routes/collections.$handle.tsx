import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {useLoaderData} from 'react-router';
import {ProductGrid} from '~/components/ProductGrid';
import {FallbackProductNotice} from '~/components/FallbackProductNotice';
import {COLLECTION_QUERY} from '~/graphql/storefront';
import {BRAND, COLLECTION_HANDLE} from '~/lib/brand';
import {SERIES_A_PRODUCTS} from '~/lib/series-a';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  const collection = data?.collection;

  return [
    {title: collection?.seo?.title ?? collection?.title ?? BRAND.collectionFullName},
    {
      name: 'description',
      content:
        collection?.seo?.description ??
        collection?.description ??
        'Series-A — Protocol:01 commerce collection.',
    },
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const handle = params.handle ?? COLLECTION_HANDLE;

  let collection = null;

  try {
    const response = await context.storefront.query(COLLECTION_QUERY, {
      variables: {handle},
      cache: context.storefront.CacheShort(),
    });

    collection = response.collection;
  } catch {
    collection = null;
  }

  return {
    collection,
    fallbackProducts: SERIES_A_PRODUCTS,
    isFallback: !collection,
  };
}

export default function CollectionRoute() {
  const {collection, fallbackProducts, isFallback} = useLoaderData<typeof loader>();
  const products = collection?.products?.nodes?.length ? collection.products.nodes : fallbackProducts;

  return (
    <main>
      <header className="page-header">
        <p className="eyebrow">Collection</p>
        <h1>{collection?.title ?? BRAND.collectionFullName}</h1>
        <p>
          {collection?.description ??
            'Products are deployed, not browsed. Series-A contains 10 active artifacts across art, apparel, and accessories.'}
        </p>
      </header>

      {isFallback ? <FallbackProductNotice /> : null}

      <ProductGrid products={products} />
    </main>
  );
}
