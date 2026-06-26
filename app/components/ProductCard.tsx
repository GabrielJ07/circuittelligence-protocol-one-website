import {useMemo, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {
  SIZE_CHIPS,
  getSeriesATagline,
  normalizeSize,
  parseFeatureBullets,
  type DepartmentProduct,
} from '~/lib/department';

export function ProductCard({product}: {product: DepartmentProduct}) {
  const images = product.images.nodes.length
    ? product.images.nodes
    : product.featuredImage
      ? [product.featuredImage]
      : [];
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const {open} = useAside();

  const features = useMemo(
    () => parseFeatureBullets(product.features?.value),
    [product.features],
  );

  const hasSizeOption = useMemo(
    () =>
      product.variants.nodes.some((variant) =>
        variant.selectedOptions.some(
          (option) => option.name.toLowerCase() === 'size',
        ),
      ),
    [product.variants],
  );

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    for (const variant of product.variants.nodes) {
      const sizeOption = variant.selectedOptions.find(
        (option) => option.name.toLowerCase() === 'size',
      );
      if (sizeOption && variant.availableForSale)
        sizes.add(normalizeSize(sizeOption.value));
    }
    return sizes;
  }, [product.variants]);

  const selectedVariant = useMemo(() => {
    if (!hasSizeOption || !selectedSize) {
      return product.variants.nodes.find((variant) => variant.availableForSale);
    }
    return product.variants.nodes.find(
      (variant) =>
        variant.availableForSale &&
        variant.selectedOptions.some(
          (option) =>
            option.name.toLowerCase() === 'size' &&
            normalizeSize(option.value) === selectedSize,
        ),
    );
  }, [hasSizeOption, product.variants, selectedSize]);

  const codename = product.title.split('//')[0]?.trim() ?? product.title;
  const tagline =
    getSeriesATagline(product.title) || product.description || product.title;

  return (
    <div className="product-card">
      <div className="product-card__media">
        {images[activeImage] && (
          <button
            type="button"
            className="product-card__main-image"
            onClick={() => setLightboxOpen(true)}
            aria-label="Expand image"
          >
            <Image
              data={images[activeImage]}
              aspectRatio="3/4"
              sizes="(min-width: 45em) 400px, 100vw"
            />
          </button>
        )}
        {images.length > 1 && (
          <div className="product-card__thumbnails">
            {images.slice(0, 4).map((image, index) => (
              <button
                key={image.id}
                type="button"
                className={`product-card__thumbnail ${
                  index === activeImage ? 'is-active' : ''
                }`}
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
              >
                <Image data={image} aspectRatio="1/1" width={80} height={80} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="product-card__header">
        <span className="product-card__codename">{codename}</span>
        <Money
          className="product-card__price"
          data={product.priceRange.minVariantPrice}
        />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__tagline">{tagline}</p>
        {features.length > 0 && (
          <ul className="product-card__features">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}
      </div>

      {hasSizeOption && (
        <div className="product-card__sizes">
          {SIZE_CHIPS.map((size) => {
            const available = availableSizes.has(size);
            return (
              <button
                key={size}
                type="button"
                disabled={!available}
                className={`product-card__size-chip ${
                  selectedSize === size ? 'is-selected' : ''
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            );
          })}
        </div>
      )}

      <AddToCartButton
        disabled={!selectedVariant}
        onClick={() => open('cart')}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant: {
                    ...selectedVariant,
                    product: {title: product.title, handle: product.handle},
                  },
                },
              ]
            : []
        }
      >
        <span className="product-card__commit">
          {selectedVariant ? 'AUTHORIZE DEPLOY →' : 'PROTOCOL CLOSED'}
        </span>
      </AddToCartButton>

      {lightboxOpen && images[activeImage] && (
        <div
          className="product-card__lightbox"
          role="dialog"
          aria-modal
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="product-card__lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            &times;
          </button>
          <Image data={images[activeImage]} sizes="90vw" />
        </div>
      )}
    </div>
  );
}
