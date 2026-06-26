import {NavLink} from 'react-router';
import {useAside} from '~/components/Aside';

export function Header() {
  const {open} = useAside();

  return (
    <header className="protocol-header">
      <a href="/" className="protocol-header__logo">
        Circuittelligence <span>PROTOCOL:01</span>
      </a>
      <nav className="protocol-header__nav" role="navigation">
        <NavLink to="/series-a">SERIES-A</NavLink>
      </nav>
      <p className="protocol-header__tagline">The constraint is the point.</p>
      <div className="protocol-header__ctas">
        <button
          type="button"
          className="protocol-header__action"
          onClick={() => open('cart')}
        >
          DEPLOYMENT QUEUE
        </button>
      </div>
    </header>
  );
}
