import {COMMERCE_LABELS} from '~/lib/brand';
import {EDITORIAL, PRIMITIVES} from '~/lib/editorial';

export function EditorialBlocks() {
  return (
    <section className="editorial-stack">
      <article className="editorial-panel">
        <h2>{EDITORIAL.circuittelligence.title}</h2>
        {EDITORIAL.circuittelligence.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="primitive-grid">
          {PRIMITIVES.map((primitive) => (
            <div className="primitive-card" key={primitive.name}>
              <strong>{primitive.name}</strong>
              <span>{primitive.label}</span>
              <p>{primitive.definition}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="editorial-panel">
        <h2>{EDITORIAL.protocol.title}</h2>
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
        </div>
      </article>
    </section>
  );
}
