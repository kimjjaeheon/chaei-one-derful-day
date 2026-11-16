/**
 * Absolute URL for the link-preview thumbnail (KakaoTalk, etc.).
 * Preview scrapers need a full https URL, so this returns undefined when the
 * site URL is unknown (local dev) and the tag is simply left out.
 */
export function ogImageUrl(siteUrl: string | undefined, imagePath: string): string | undefined {
  if (!siteUrl || !/^https:\/\//i.test(siteUrl)) return undefined;
  const base = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
  return `${base}${imagePath.replace(/^\.?\//, "")}`;
}
