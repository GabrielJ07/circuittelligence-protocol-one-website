export function HeroSection() {
  return (
    <section className="hero-section">
      <div
        className="hero-section__bg"
        style={{backgroundImage: "url('/assets/IMG_HOME_HERO_CONSTRAINT_16X9.jpg')"}}
      />
      <h1 className="hero-section__title">CONSTRAINT is the POINT</h1>
      <span className="hero-section__scroll" aria-hidden>
        ↓
      </span>
    </section>
  );
}
