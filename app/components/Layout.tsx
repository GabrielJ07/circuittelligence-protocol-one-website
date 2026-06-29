import {Link, Outlet, useRouteLoaderData} from 'react-router';
import {BRAND, COMMERCE_LABELS} from '~/lib/brand';

type RootLoaderData = { cart?: {totalQuantity?: number} | null };

export function Layout() {
  const rootData = useRouteLoaderData<RootLoaderData>('root');
  const cartQuantity = rootData?.cart?.totalQuantity ?? 0;
  return (
    <div className="site">
      <header className="site-header">
        <Link className="brand" to="/" aria-label={BRAND.pageTitle}>
          <strong>{BRAND.company}</strong><span>{BRAND.protocol}</span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          <Link to="/collections/series-a-protocol-01">Series-A</Link>
          <Link to="/pages/knowledge-base">Knowledge Base</Link>
          <Link to="/cart">{COMMERCE_LABELS.cart}{cartQuantity ? ` (${cartQuantity})` : ''}</Link>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer"><p>{BRAND.closer}</p></footer>
    </div>
  );
}
