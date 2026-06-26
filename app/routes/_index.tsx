import {Await, useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {HeroSection} from '~/components/HeroSection';
import {TextOverlaySection} from '~/components/TextOverlaySection';
import {CategoryShop} from '~/components/CategoryShop';
import {LifestyleParallax} from '~/components/LifestyleParallax';
import {ProductCarousel} from '~/components/ProductCarousel';
import {InventoryGrid} from '~/components/InventoryGrid';
import {SERIES_A_COLLECTION_ID} from '~/lib/department';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Circuittelligence | Protocol:01'}];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  return {...deferredData};
}

function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY, {
      variables: {id: SERIES_A_COLLECTION_ID},
    })
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="home">
      <HeroSection />

      <TextOverlaySection
        eyebrow="PROTOCOL BETA"
        title="The doctrine is open."
        body="Protocol Beta extends governed intelligence into the field — hardware built for the operator who answers to no black box."
        ctaText="[READ THE DOCTRINE]"
        ctaHref="/signal"
        align="left"
      />

      <TextOverlaySection
        eyebrow="SERIES-A"
        title="Beautiful intelligence, bounded."
        body="Engineered for the operator. Worn by the human. The store opens and closes — products are deployed, not browsed."
        ctaText="[VIEW SERIES-A]"
        ctaHref="/series-a"
        align="right"
      />

      <CategoryShop />

      <LifestyleParallax />

      <Suspense fallback={null}>
        <Await resolve={data.recommendedProducts}>
          {(response) => (
            <ProductCarousel
              products={response?.collection?.products.nodes ?? []}
            />
          )}
        </Await>
      </Suspense>

      <Suspense fallback={null}>
        <Await resolve={data.recommendedProducts}>
          {(response) => (
            <InventoryGrid
              products={response?.collection?.products.nodes ?? []}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts (
    $id: ID!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(id: $id) {
      products(first: 10) {
        nodes {
          ...RecommendedProduct
        }
      }
    }
  }
` as const;
