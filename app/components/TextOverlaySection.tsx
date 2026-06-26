import {Link} from 'react-router';

export function TextOverlaySection({
  eyebrow,
  title,
  body,
  ctaText,
  ctaHref,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  body: string;
  ctaText?: string;
  ctaHref?: string;
  align?: 'left' | 'right';
}) {
  return (
    <section className={`text-overlay-section text-overlay-section--${align}`}>
      <div className="text-overlay-section__content">
        <p className="text-overlay-section__eyebrow">{eyebrow}</p>
        <h2 className="text-overlay-section__title">{title}</h2>
        <p className="text-overlay-section__body">{body}</p>
        {ctaText && ctaHref && (
          <Link to={ctaHref} className="text-overlay-section__cta">
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
