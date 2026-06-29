import {Link} from 'react-router';
import {BRAND, COLLECTION_HANDLE, COMMERCE_LABELS} from '~/lib/brand';

export function Hero() {
  return (
    <section className="hero">
      <p className="eyebrow">{BRAND.company} // {BRAND.protocol}</p>
      <h1>{BRAND.collectionFullName}</h1>
      <p className="hero-tagline">{BRAND.tagline}</p>
      <p className="hero-copy">
        A commerce surface for governed intelligence. Products are deployed, not browsed.
      </p>
      <Link className="cta" to={`/collections/${COLLECTION_HANDLE}`}>
        {COMMERCE_LABELS.continueShopping}
      </Link>
    </section>
  );
}
