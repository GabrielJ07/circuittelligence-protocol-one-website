import {useMemo, useState} from 'react';
import {CartForm, Money} from '@shopify/hydrogen';
import {COMMERCE_LABELS} from '~/lib/brand';

type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions?: Array<{name: string; value: string}>;
  price: {amount: string; currencyCode: string};
};

export function ProductPurchaseForm({variants, productCode}: {variants: ProductVariant[]; productCode?: string}) {
  const firstAvailable = variants.find((variant) => variant.availableForSale) ?? variants[0];
  const [selectedVariantId, setSelectedVariantId] = useState(firstAvailable?.id ?? '');
  const selectedVariant = useMemo(
    () => variants.find((variant) => variant.id === selectedVariantId) ?? firstAvailable,
    [firstAvailable, selectedVariantId, variants],
  );

  if (!selectedVariant) return <section className="purchase-panel"><p>{COMMERCE_LABELS.soldOut}</p></section>;

  const lines = [{
    merchandiseId: selectedVariant.id,
    quantity: 1,
    attributes: [
      {key: 'Protocol', value: 'Protocol:01'},
      {key: 'Series', value: 'Series-A'},
      ...(productCode ? [{key: 'Code', value: productCode}] : []),
    ],
  }];

  return (
    <section className="purchase-panel">
      <label htmlFor="variant">Deployment configuration</label>
      <select id="variant" value={selectedVariant.id} onChange={(event) => setSelectedVariantId(event.currentTarget.value)}>
        {variants.map((variant) => (
          <option key={variant.id} value={variant.id} disabled={!variant.availableForSale}>
            {variant.title} — {variant.availableForSale ? COMMERCE_LABELS.inStock : COMMERCE_LABELS.soldOut}
          </option>
        ))}
      </select>
      <p className="price"><Money data={selectedVariant.price} /></p>
      <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{lines}}>
        {(fetcher) => (
          <button type="submit" className="button" disabled={!selectedVariant.availableForSale || fetcher.state !== 'idle'}>
            {selectedVariant.availableForSale ? COMMERCE_LABELS.addToCart : COMMERCE_LABELS.soldOut}
          </button>
        )}
      </CartForm>
    </section>
  );
}
