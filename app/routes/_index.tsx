import type {MetaFunction} from 'react-router';
import {Link} from 'react-router';
import {Hero} from '~/components/Hero';
import {EditorialBlocks} from '~/components/EditorialBlocks';
import {ProductGrid} from '~/components/ProductGrid';
import {BRAND, COLLECTION_HANDLE} from '~/lib/brand';
import {SERIES_A_PRODUCTS} from '~/lib/series-a';

export const meta: MetaFunction = () => [
  {title: BRAND.title},
  {
    name: 'description',
    content: 'Protocol:01 / Series-A commerce surface for Circuittelligence.',
  },
];

export default function IndexRoute() {
  return (
    <main>
      <Hero />

      <section className="section-header">
        <p className="eyebrow">Series-A register</p>
        <h2>10 active artifacts</h2>
        <p>
          Canvas art, apparel, and accessories structured as a governed commerce surface.
        </p>
        <Link to={`/collections/${COLLECTION_HANDLE}`} className="inline-link">
          Enter Series-A
        </Link>
      </section>

      <ProductGrid products={SERIES_A_PRODUCTS} />

      <EditorialBlocks />
    </main>
  );
}
