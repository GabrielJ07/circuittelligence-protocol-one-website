import {CartForm} from '@shopify/hydrogen';

export function BuyButton({merchandiseId,productCode,disabledReason}:{merchandiseId:string;productCode:string;disabledReason?:string}) {
  if (disabledReason) {
    return <div className="buy-panel"><button className="button" type="button" disabled>BUY / AUTHORIZE DEPLOY</button><p className="warning">{disabledReason}</p></div>;
  }
  return (
    <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{lines:[{merchandiseId,quantity:1,attributes:[{key:'Protocol',value:'Protocol:01'},{key:'Series',value:'Series-A'},{key:'Code',value:productCode}]}]}}>
      {(fetcher)=><button className="button" type="submit" disabled={fetcher.state!=='idle'}>BUY / AUTHORIZE DEPLOY</button>}
    </CartForm>
  );
}
