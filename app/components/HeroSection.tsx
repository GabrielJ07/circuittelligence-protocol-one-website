import {Link} from 'react-router';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section__scrim" />
      <div className="hero-section__content">
        <p className="hero-section__eyebrow">CIRCUITTELLIGENCE // PROTOCOL:01</p>
        <h1 className="hero-section__title">
          Beautiful intelligence, bounded.
        </h1>
        <p className="hero-section__subtitle">
          Aerospace-grade systems hardware, deployed to the operator and the
          human who wears it.
        </p>
        <Link to="/shop-men" className="hero-section__cta">
          [INITIATE DEPLOYMENT]
        </Link>
      </div>
    </section>
  );
}
