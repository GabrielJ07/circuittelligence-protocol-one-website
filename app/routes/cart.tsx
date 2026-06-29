import type {ActionFunctionArgs, LoaderFunctionArgs, MetaFunction} from 'react-router';
import {data, Link, redirect, useLoaderData} from 'react-router';
import {CartForm, Money, OptimisticInput, useOptimisticCart, useOptimisticData} from '@shopify/hydrogen';
import type {Cart, CartLine} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import {COMMERCE_LABELS} from '~/lib/brand';

export const meta: MetaFunction = () => [
  {title: COMMERCE_LABELS.cart},
  {name: 'description', content: 'Protocol:01 deployment queue.'},
];

export async function loader({context}: LoaderFunctionArgs) {
  return {
    cart: await context.cart.get(),
  };
}

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  invariant(action, 'Cart action is required.');

  let status = 200;
  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      status = 303;
      break;

    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;

    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;

    case CartForm.ACTIONS.DiscountCodesUpdate:
      result = await cart.updateDiscountCodes(inputs.discountCodes);
      break;

    default:
      throw new Response(`Unsupported cart action: ${action}`, {status: 400});
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();

  const redirectTo = formData.get('redirectTo');

  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(result, {status, headers});
}

export default function CartRoute() {
  const {cart} = useLoaderData<typeof loader>();

  return (
    <main>
      <header className="page-header">
        <p className="eyebrow">Protocol:01</p>
        <h1>{COMMERCE_LABELS.cart}</h1>
      </header>

      <CartView cart={cart} />
    </main>
  );
}

function CartView({cart: originalCart}: {cart: Cart | null}) {
  const cart = useOptimisticCart(originalCart);

  if (!cart?.lines?.nodes?.length) {
    return (
      <section className="empty-cart">
        <p>No active deployments.</p>
        <Link className="cta secondary" to="/collections/series-a-protocol-01">
          {COMMERCE_LABELS.continueShopping}
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-layout">
      <div className="cart-lines">
        {cart.lines.nodes.map((line) => (
          <CartLineItem key={line.id} line={line as CartLine & {isOptimistic?: boolean}} />
        ))}
      </div>

      <aside className="cart-summary">
        <h2>Deployment summary</h2>

        {cart.cost?.subtotalAmount ? (
          <p className="cart-total">
            <span>Subtotal</span>
            <Money data={cart.cost.subtotalAmount} />
          </p>
        ) : null}

        {cart.checkoutUrl ? (
          <a className="cta" href={cart.checkoutUrl}>
            {COMMERCE_LABELS.checkout}
          </a>
        ) : (
          <p>Checkout URL unavailable.</p>
        )}

        <p className="fine-print">
          Taxes, delivery, and payment resolve inside Shopify checkout.
        </p>
      </aside>
    </section>
  );
}

function CartLineItem({line}: {line: CartLine & {isOptimistic?: boolean}}) {
  const optimisticData = useOptimisticData<{action: string}>(line.id);
  const hidden = optimisticData?.action === 'remove';

  if (hidden) return null;

  const quantity = line.quantity;

  return (
    <article className="cart-line">
      <div>
        <Link to={`/products/${line.merchandise.product.handle}`}>
          <h3>{line.merchandise.product.title}</h3>
        </Link>
        <p>{line.merchandise.title}</p>
        {line.cost?.totalAmount ? <Money data={line.cost.totalAmount} /> : null}
      </div>

      <div className="cart-line__actions">
        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.LinesUpdate}
          inputs={{
            lines: [
              {
                id: line.id,
                quantity: Math.max(1, quantity - 1),
              },
            ],
          }}
        >
          <button type="submit" disabled={line.isOptimistic || quantity <= 1}>
            −
          </button>
        </CartForm>

        <span>{quantity}</span>

        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.LinesUpdate}
          inputs={{
            lines: [
              {
                id: line.id,
                quantity: quantity + 1,
              },
            ],
          }}
        >
          <button type="submit" disabled={line.isOptimistic}>
            +
          </button>
        </CartForm>

        <CartForm
          route="/cart"
          action={CartForm.ACTIONS.LinesRemove}
          inputs={{lineIds: [line.id]}}
        >
          <button type="submit" disabled={line.isOptimistic}>
            Remove
          </button>
          <OptimisticInput id={line.id} data={{action: 'remove'}} />
        </CartForm>
      </div>
    </article>
  );
}
