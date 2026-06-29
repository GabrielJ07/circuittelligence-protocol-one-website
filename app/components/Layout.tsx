import {Link, Outlet, useRouteLoaderData} from 'react-router';
import {BRAND, COMMERCE_LABELS} from '~/lib/brand';

type RootLoaderData = {
  cart?: {
    totalQuantity?: number;
  } | null;
};

export function Layout() {
  const rootData = useRouteLoaderData<RootLoaderData>('root');
  const cartQuantity = rootData?.cart?.totalQuantity ?? 0;

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link to="/" className="brand-mark" aria-label={BRAND.title}>
          <span>{BRAND.company}</span>
          <small>{BRAND.protocol}</small>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <Link to="/collections/series-a-protocol-01">Series-A</Link>
          <Link to="/pages/protocol-01">Protocol:01</Link>
          <Link to="/cart">
            {COMMERCE_LABELS.cart}
            {cartQuantity > 0 ? ` (${cartQuantity})` : ''}
          </Link>
        </nav>
      </header>

      <Outlet />

      <footer className="site-footer">
        <p>{BRAND.close}</p>
      </footer>
    </div>
  );
}
