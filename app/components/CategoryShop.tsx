import {Link} from 'react-router';

const CATEGORIES = [
  {handle: '/shop-men', label: 'MEN'},
  {handle: '/shop-women', label: 'WOMEN'},
  {handle: '/shop-artifacts', label: 'ARTIFACTS'},
];

export function CategoryShop() {
  return (
    <section className="category-shop">
      {CATEGORIES.map((category) => (
        <Link
          key={category.handle}
          to={category.handle}
          className="category-shop__item"
        >
          <span className="category-shop__label">{category.label}</span>
          <span className="category-shop__arrow">→</span>
        </Link>
      ))}
    </section>
  );
}
