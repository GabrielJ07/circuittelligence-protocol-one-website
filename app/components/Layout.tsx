import {Link, Outlet, useRouteLoaderData} from 'react-router';
import {BRAND, COMMERCE_LABELS} from '~/lib/brand';

type RootData = {
  cart?: {
    totalQuantity?: number;
  } | null;
};

export function Layout() {
  const rootData = useRouteLoaderData<RootData>('root');
  const cartQuantity = rootData?.cart?.totalQuantity ?? 0;

  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="brand">
          <strong>{BRAND.company}</strong>
          <span>{BRAND.protocol}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          <Link to="/collections/series-a-protocol-01">Series-A</Link>
          <Link to="/pages/knowledge-base">Knowledge Base</Link>
          <Link to="/cart">
            {COMMERCE_LABELS.cart}
            {cartQuantity > 0 ? ` (${cartQuantity})` : ''}
          </Link>
        </nav>
      </header>

      <Outlet />

      <footer className="footer">
        <p>{BRAND.close}</p>
      </footer>
    </div>
  );
}
