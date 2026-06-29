import type {MetaFunction} from 'react-router';
import {COMMERCE_LABELS} from '~/lib/brand';
import {EDITORIAL} from '~/lib/editorial';

export const meta: MetaFunction = () => [
  {title: 'Protocol:01'},
  {name: 'description', content: 'Protocol:01 commerce doctrine.'},
];

export default function ProtocolPage() {
  return (
    <main>
      <header className="page-header">
        <p className="eyebrow">Doctrine</p>
        <h1>{EDITORIAL.protocol.title}</h1>
      </header>

      <section className="editorial-panel">
        {EDITORIAL.protocol.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="override-grid">
          <span>Add to cart → {COMMERCE_LABELS.addToCart}</span>
          <span>Cart → {COMMERCE_LABELS.cart}</span>
          <span>Checkout → {COMMERCE_LABELS.checkout}</span>
          <span>Sold out → {COMMERCE_LABELS.soldOut}</span>
          <span>In stock → {COMMERCE_LABELS.inStock}</span>
          <span>Shipping → {COMMERCE_LABELS.shipping}</span>
          <span>Search → {COMMERCE_LABELS.search}</span>
          <span>Continue shopping → {COMMERCE_LABELS.continueShopping}</span>
        </div>
      </section>
    </main>
  );
}
