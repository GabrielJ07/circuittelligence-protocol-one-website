import {Link} from 'react-router';
import {CartForm, Image, Money, useOptimisticCart} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

export function CartDrawer({cart: originalCart}: {cart: CartApiQueryFragment | null}) {
  const cart = useOptimisticCart(originalCart);
  const {close} = useAside();
  const lines = cart?.lines?.nodes ?? [];

  if (!lines.length) {
    return (
      <div className="cart-drawer cart-drawer--empty">
        <p>No payloads queued.</p>
        <Link to="/shop-men" onClick={close} className="cart-drawer__browse">
          BROWSE INVENTORY →
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-drawer">
      <ul className="cart-drawer__lines">
        {lines.map((line) => {
          const {id, merchandise, cost} = line;
          const totalAmount = cost?.totalAmount ?? {
            amount: (
              Number(merchandise.price.amount) * line.quantity
            ).toString(),
            currencyCode: merchandise.price.currencyCode,
          };
          return (
            <li key={id} className="cart-drawer__line">
              {merchandise.image && (
                <Image
                  data={merchandise.image}
                  aspectRatio="1/1"
                  width={80}
                  height={80}
                  className="cart-drawer__line-image"
                />
              )}
              <div className="cart-drawer__line-info">
                <p className="cart-drawer__line-title">
                  {merchandise.product.title}
                </p>
                <Money data={totalAmount} />
              </div>
              <CartForm
                route="/cart"
                action={CartForm.ACTIONS.LinesRemove}
                inputs={{lineIds: [id]}}
              >
                <button
                  type="submit"
                  className="cart-drawer__remove"
                  aria-label="Remove payload"
                >
                  &times;
                </button>
              </CartForm>
            </li>
          );
        })}
      </ul>
      <footer className="cart-drawer__footer">
        <div className="cart-drawer__total">
          Payload Valuation:{' '}
          {cart?.cost?.subtotalAmount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : (
            '-'
          )}
        </div>
        <a
          href={cart?.checkoutUrl ?? '#'}
          className="cart-drawer__deploy"
        >
          [DEPLOY PAYLOAD]
        </a>
      </footer>
    </div>
  );
}
