import {Link} from 'react-router';

export function EditorialHeader({
  breadcrumb,
  title,
  abstract,
}: {
  breadcrumb: string;
  title: string;
  abstract: string;
}) {
  return (
    <header className="editorial-header">
      <nav className="editorial-header__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">HOME</Link>
        <span>/</span>
        <span>{breadcrumb}</span>
      </nav>
      <h1 className="editorial-header__title">{title}</h1>
      <p className="editorial-header__abstract">{abstract}</p>
    </header>
  );
}
