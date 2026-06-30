import type {LinksFunction,LoaderFunctionArgs,MetaFunction} from 'react-router';
import {Links,Meta,Scripts,ScrollRestoration,isRouteErrorResponse,useRouteError} from 'react-router';
import {Layout} from '~/components/Layout';
import styles from '~/styles/app.css?url';
export const links:LinksFunction=()=>[{rel:'stylesheet',href:styles}];
export const meta:MetaFunction=()=>[{title:'Circuittelligence // Protocol:01 // Series-A'},{name:'description',content:'Hydrogen Shopify checkout storefront.'}];
export async function loader({context}:LoaderFunctionArgs){return {cart:await context.cart.get()};}
export default function App(){return <html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><Meta/><Links/></head><body><Layout/><ScrollRestoration/><Scripts/></body></html>;}
export function ErrorBoundary(){const e=useRouteError();let title='Protocol exception',message='Unexpected storefront state.'; if(isRouteErrorResponse(e)){title=`${e.status} ${e.statusText}`;message=String(e.data??message)} else if(e instanceof Error) message=e.message; return <html lang="en"><head><title>{title}</title><Meta/><Links/></head><body><main className="page"><h1>{title}</h1><p>{message}</p></main><Scripts/></body></html>;}
