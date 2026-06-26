import {NavLink} from 'react-router';
import {useAside} from '~/components/Aside';

export function Header() {
  const {open} = useAside();

  function playSignal() {
    const audio = new Audio('/assets/signal_scan.mp3');
    audio.play().catch(() => {});
  }

  return (
    <header className="protocol-header">
      <a href="/" className="protocol-header__logo">
        Circuittelligence <span>PROTOCOL:01</span>
      </a>
      <nav className="protocol-header__nav" role="navigation">
        <NavLink to="/doctrine">DOCTRINE</NavLink>
        <NavLink to="/services">SERVICES</NavLink>
        <NavLink to="/shop-men">SHOP</NavLink>
        <NavLink to="/fund">FUND</NavLink>
      </nav>
      <div className="protocol-header__ctas">
        <button
          type="button"
          className="protocol-header__action"
          onClick={playSignal}
        >
          [SIGNAL]
        </button>
        <button
          type="button"
          className="protocol-header__action"
          onClick={() => open('cart')}
        >
          [OPERATIONS]
        </button>
      </div>
    </header>
  );
}
