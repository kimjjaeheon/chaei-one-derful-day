/**
 * Resolve a photo path written in src/lib/invitation.ts against the site's base path.
 * GitHub Pages serves the site under /<repo-name>/, so "/images/main.jpg" has to
 * become "/<repo-name>/images/main.jpg". Absolute URLs are left untouched.
 */
export function resolvePhotoSrc(src: string, baseUrl: string = import.meta.env.BASE_URL): string {
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${base}${src.replace(/^\.?\//, "")}`;
}
