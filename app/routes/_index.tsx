import type {MetaFunction} from 'react-router';
import {Link} from 'react-router';
import {ProductGrid} from '~/components/ProductGrid';
import {BRAND, CANONICAL_SOURCE_PATH, COLLECTION_HANDLE, COMMERCE_LABELS} from '~/lib/brand';
import {SERIES_A_PRODUCTS} from '~/lib/series-a';

export const meta: MetaFunction = () => [
  {title: BRAND.pageTitle},
  {name: 'description', content: 'Protocol:01 / Series-A commerce surface.'},
];

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">{BRAND.company} // {BRAND.protocol}</p>
        <h1>{BRAND.collectionTitle}</h1>
        <p className="tagline">{BRAND.tagline}</p>
        <div className="actions">
          <Link className="button" to={`/collections/${COLLECTION_HANDLE}`}>{COMMERCE_LABELS.continueShopping}</Link>
          <Link className="text-link" to="/pages/knowledge-base">View preserved knowledge base</Link>
          <Link className="text-link" to={CANONICAL_SOURCE_PATH}>Open exact source HTML</Link>
        </div>
      </section>
      <section className="section-head"><p className="eyebrow">Series-A register</p><h2>10 active artifacts</h2></section>
      <ProductGrid products={SERIES_A_PRODUCTS} />
    </main>
  );
}
