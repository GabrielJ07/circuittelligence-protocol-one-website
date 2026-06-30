import type {ActionFunctionArgs,LoaderFunctionArgs,MetaFunction} from 'react-router';
import {data,Link,useLoaderData} from 'react-router';
import {CartForm,Money} from '@shopify/hydrogen';

export const meta:MetaFunction=()=>[{title:'Cart — Circuittelligence'}];
export async function loader({context}:LoaderFunctionArgs){return {cart:await context.cart.get()};}
export async function action({request,context}:ActionFunctionArgs){
 const formData=await request.formData();
 const {action,inputs}=CartForm.getFormInput(formData);
 if(!action) throw new Response('Missing cart action.',{status:400});
 let result;
 switch(action){
  case CartForm.ACTIONS.LinesAdd: result=await context.cart.addLines(inputs.lines); break;
  case CartForm.ACTIONS.LinesUpdate: result=await context.cart.updateLines(inputs.lines); break;
  case CartForm.ACTIONS.LinesRemove: result=await context.cart.removeLines(inputs.lineIds); break;
  case CartForm.ACTIONS.DiscountCodesUpdate: result=await context.cart.updateDiscountCodes(inputs.discountCodes); break;
  default: throw new Response(`Unsupported cart action: ${action}`,{status:400});
 }
 const headers=result?.cart?.id ? context.cart.setCartId(result.cart.id) : new Headers();
 return data({cart:result.cart,errors:result.errors},{status:200,headers});
}
export default function CartRoute(){const {cart}=useLoaderData<typeof loader>(); if(!cart?.lines?.nodes?.length){return <main className="page"><h1>Cart</h1><p>Your cart is empty.</p><Link className="button secondary" to="/collections/series-a">Shop Series-A</Link></main>}
 return <main className="page cart-layout"><section><p className="eyebrow">Deployment Queue</p><h1>Cart</h1><div className="cart-lines">{cart.lines.nodes.map((line)=><article className="cart-line" key={line.id}><div><h3>{line.merchandise.product.title}</h3><p>{line.merchandise.title}</p>{line.cost?.totalAmount?<Money data={line.cost.totalAmount}/>:null}</div><div className="line-actions"><CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate} inputs={{lines:[{id:line.id,quantity:Math.max(1,line.quantity-1)}]}}><button type="submit" disabled={line.quantity<=1}>−</button></CartForm><span>{line.quantity}</span><CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate} inputs={{lines:[{id:line.id,quantity:line.quantity+1}]}}><button type="submit">+</button></CartForm><CartForm route="/cart" action={CartForm.ACTIONS.LinesRemove} inputs={{lineIds:[line.id]}}><button type="submit">Remove</button></CartForm></div></article>)}</div></section><aside className="summary"><h2>Summary</h2>{cart.cost?.subtotalAmount?<p className="summary-row"><span>Subtotal</span><strong><Money data={cart.cost.subtotalAmount}/></strong></p>:null}{cart.checkoutUrl?<a className="button" href={cart.checkoutUrl}>CHECKOUT / CONFIRM DEPLOYMENT</a>:<p className="warning">Shopify did not return checkoutUrl for this cart.</p>}</aside></main>
}
