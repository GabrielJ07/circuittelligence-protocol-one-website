import {useLoaderData} from 'react-router';
import type {Route} from './+types/shop-men';
import {getPaginationVariables} from '@shopify/hydrogen';
import {DepartmentHero} from '~/components/DepartmentHero';
import {ProductCatalog} from '~/components/ProductCatalog';
import {DEPARTMENT_QUERY, type DepartmentCollection} from '~/lib/department';

const HANDLE = 'men';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Circuittelligence | Shop — Men'}];
};

export async function loader(args: Route.LoaderArgs) {
  const {context, request} = args;
  const paginationVariables = getPaginationVariables(request, {pageBy: 8});

  const {collection} = await context.storefront.query(DEPARTMENT_QUERY, {
    variables: {handle: HANDLE, ...paginationVariables},
  });

  return {collection: collection as DepartmentCollection | null};
}

export default function ShopMen() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div className="department">
      <DepartmentHero
        title={collection?.title ?? 'MEN'}
        description={
          collection?.description ??
          'Aerospace tactical logistics for the operator.'
        }
        image={collection?.image}
      />
      <ProductCatalog products={collection?.products?.nodes ?? []} />
    </div>
  );
}
