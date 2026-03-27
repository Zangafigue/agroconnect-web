const BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Resolves an image path to an absolute URL.
 * - If already absolute (http/https), returns as-is.
 * - If relative (e.g. /uploads/image.jpg), prepends the backend base URL.
 * - If null / undefined, returns empty string.
 */
export function resolveImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${BASE_URL}${path}`;
  return `${BASE_URL}/${path}`;
}

/**
 * Normalizes the images array of a product, resolving all paths to absolute URLs.
 */
export function normalizeProductImages(product) {
  if (!product) return product;
  return {
    ...product,
    images: Array.isArray(product.images)
      ? product.images.map(resolveImageUrl).filter(Boolean)
      : [],
    // Also normalize the legacy 'image' singular field if present
    image: product.image ? resolveImageUrl(product.image) : undefined,
  };
}
