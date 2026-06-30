import type {EntryContext} from 'react-router';
import {ServerRouter} from 'react-router';
import {renderToReadableStream} from 'react-dom/server';
import {isbot} from 'isbot';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
export default async function handleRequest(request:Request,status:number,headers:Headers,context:EntryContext){
 const {nonce,header,NonceProvider}=createContentSecurityPolicy({styleSrc:["'self'","'unsafe-inline'"],imgSrc:["'self'","data:","https://cdn.shopify.com"]});
 const body=await renderToReadableStream(<NonceProvider><ServerRouter context={context} url={request.url} nonce={nonce}/></NonceProvider>,{nonce,signal:request.signal,onError(e){console.error(e);status=500;}});
 if(isbot(request.headers.get('user-agent'))) await body.allReady;
 headers.set('Content-Type','text/html'); headers.set('Content-Security-Policy',header);
 return new Response(body,{status,headers});
}
