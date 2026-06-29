import type {ActionFunctionArgs, LoaderFunctionArgs, MetaFunction} from 'react-router';
import {data, Link, useLoaderData} from 'react-router';
import {CartForm, Money, OptimisticInput, useOptimisticCart, useOptimisticData} from '@shopify/hydrogen';
import type {Cart, CartLine} from '@shopify/hydrogen/storefront-api-types';
import invariant from 'tiny-invariant';
import {COLLECTION_HANDLE, COMMERCE_LABELS} from '~/lib/brand';

export const meta: MetaFunction = () => [
  {title: COMMERCE_LABELS.cart},
  {name: 'description', content: 'Protocol:01 deployment queue.'},
];

export async function loader({context}: LoaderFunctionArgs) {
  return {cart: await context.cart.get()};
}

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);
  invariant(action, 'Cart action is required.');

  let result;
  let status = 200;

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

  const headers = result?.cart?.id ? cart.setCartId(result.cart.id) : new Headers();
  const redirectTo = formData.get('redirectTo');
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }
  return data(result, {status, headers});
}

export default function CartRoute() {
  const {cart} = useLoaderData<typeof loader>();
  const optimisticCart = useOptimisticCart(cart as Cart | null);

  if (!optimisticCart?.lines?.nodes?.length) {
    return (
      <main className="page">
        <header className="section-head">
          <p className="eyebrow">Protocol:01</p>
          <h1>{COMMERCE_LABELS.cart}</h1>
          <p>No active deployments.</p>
        </header>
        <Link className="button secondary" to={`/collections/${COLLECTION_HANDLE}`}>{COMMERCE_LABELS.continueShopping}</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="section-head">
        <p className="eyebrow">Protocol:01</p>
        <h1>{COMMERCE_LABELS.cart}</h1>
      </header>
      <section className="cart-layout">
        <div className="cart-lines">
          {optimisticCart.lines.nodes.map((line) => (
            <CartLineItem key={line.id} line={line as CartLine & {isOptimistic?: boolean}} />
          ))}
        </div>
        <aside className="cart-summary">
          <h2>Deployment summary</h2>
          {optimisticCart.cost?.subtotalAmount ? <p className="cart-total"><span>Subtotal</span><Money data={optimisticCart.cost.subtotalAmount} /></p> : null}
          {optimisticCart.checkoutUrl ? <a className="button" href={optimisticCart.checkoutUrl}>{COMMERCE_LABELS.checkout}</a> : <p>Checkout URL unavailable.</p>}
        </aside>
      </section>
    </main>
  );
}

function CartLineItem({line}: {line: CartLine & {isOptimistic?: boolean}}) {
  const optimisticData = useOptimisticData<{action: string}>(line.id);
  if (optimisticData?.action === 'remove') return null;

  return (
    <article className="cart-line">
      <div>
        <Link to={`/products/${line.merchandise.product.handle}`}><h3>{line.merchandise.product.title}</h3></Link>
        <p>{line.merchandise.title}</p>
        {line.cost?.totalAmount ? <Money data={line.cost.totalAmount} /> : null}
      </div>
      <div className="cart-actions">
        <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate} inputs={{lines: [{id: line.id, quantity: Math.max(1, line.quantity - 1)}]}}>
          <button type="submit" disabled={line.isOptimistic || line.quantity <= 1}>−</button>
        </CartForm>
        <span>{line.quantity}</span>
        <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate} inputs={{lines: [{id: line.id, quantity: line.quantity + 1}]}}>
          <button type="submit" disabled={line.isOptimistic}>+</button>
        </CartForm>
        <CartForm route="/cart" action={CartForm.ACTIONS.LinesRemove} inputs={{lineIds: [line.id]}}>
          <button type="submit" disabled={line.isOptimistic}>Remove</button>
          <OptimisticInput id={line.id} data={{action: 'remove'}} />
        </CartForm>
      </div>
    </article>
  );
}
