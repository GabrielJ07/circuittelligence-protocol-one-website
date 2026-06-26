import {Link} from 'react-router';

export function CategoryShop() {
  return (
    <section className="category-shop">
      <Link to="/series-a" className="category-shop__item">
        <span className="category-shop__label">SERIES-A — PROTOCOL:01</span>
        <span className="category-shop__arrow">→</span>
      </Link>
    </section>
  );
}
