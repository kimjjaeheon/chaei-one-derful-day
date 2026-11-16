/**
 * The deployed site address, forced to https. GitHub Pages can report its
 * address as http://, but link-preview scrapers (KakaoTalk, etc.) want https.
 * Returns undefined when the address is unknown or local, so tags are left out.
 */
export function normalizeSiteUrl(siteUrl: string | undefined): string | undefined {
  if (!siteUrl) return undefined;
  const url = siteUrl.trim().replace(/^http:\/\//i, "https://");
  if (!/^https:\/\//i.test(url) || /^https:\/\/(localhost|127\.0\.0\.1)([:/]|$)/i.test(url)) {
    return undefined;
  }
  return url.endsWith("/") ? url : `${url}/`;
}

/** Absolute https URL for the link-preview thumbnail. */
export function ogImageUrl(siteUrl: string | undefined, imagePath: string): string | undefined {
  const base = normalizeSiteUrl(siteUrl);
  if (!base) return undefined;
  return `${base}${imagePath.replace(/^\.?\//, "")}`;
}
