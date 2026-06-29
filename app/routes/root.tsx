import type {LinksFunction, LoaderFunctionArgs} from 'react-router';
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';
import {Layout} from '~/components/Layout';
import appStyles from '~/styles/app.css?url';

export const links: LinksFunction = () => [
  {rel: 'preconnect', href: 'https://cdn.shopify.com'},
  {rel: 'stylesheet', href: appStyles},
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;800&family=JetBrains+Mono:wght@400;700&family=Fraunces:ital@1&display=swap',
  },
];

export async function loader({context}: LoaderFunctionArgs) {
  return {
    cart: await context.cart.get(),
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let title = 'System irregularity';
  let message = 'The protocol returned an unexpected state.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main className="page-header">
          <p className="eyebrow">Protocol exception</p>
          <h1>{title}</h1>
          <p>{message}</p>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
