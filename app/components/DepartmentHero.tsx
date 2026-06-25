import {Image} from '@shopify/hydrogen';
import type {DepartmentImage} from '~/lib/department';

export function DepartmentHero({
  title,
  description,
  image,
}: {
  title: string;
  description?: string;
  image?: DepartmentImage | null;
}) {
  return (
    <section className="department-hero">
      {image && (
        <Image
          data={image}
          className="department-hero__image"
          sizes="100vw"
          aria-hidden
        />
      )}
      <div className="department-hero__scrim" />
      <div className="department-hero__content">
        <h1 className="department-hero__title">{title}</h1>
        {description && (
          <p className="department-hero__description">{description}</p>
        )}
      </div>
    </section>
  );
}
