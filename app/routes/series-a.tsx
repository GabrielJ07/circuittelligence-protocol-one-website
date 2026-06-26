import {useLoaderData} from 'react-router';
import type {Route} from './+types/series-a';
import {DepartmentHero} from '~/components/DepartmentHero';
import {ProductCatalog} from '~/components/ProductCatalog';
import {
  SERIES_A_COLLECTION_ID,
  SERIES_A_COLLECTION_QUERY,
  type DepartmentCollection,
} from '~/lib/department';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Circuittelligence | Series-A — Protocol:01'}];
};

export async function loader(args: Route.LoaderArgs) {
  const {context} = args;

  const {collection} = await context.storefront.query(
    SERIES_A_COLLECTION_QUERY,
    {
      variables: {id: SERIES_A_COLLECTION_ID, first: 20},
    },
  );

  return {collection: collection as DepartmentCollection | null};
}

export default function SeriesA() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="department">
      <DepartmentHero
        title={collection?.title ?? 'Series-A — Protocol:01'}
        description={
          collection?.description ?? 'The constraint is the point.'
        }
        image={collection?.image}
      />
      <ProductCatalog products={collection?.products?.nodes ?? []} />
    </div>
  );
}
