import { describe, expect, it } from "vitest";
import { normalizeSiteUrl, ogImageUrl } from "./og";

describe("ogImageUrl", () => {
  it("joins the GitHub Pages site URL and the thumbnail path", () => {
    expect(ogImageUrl("https://kim.github.io/dol", "/images/og-thumbnail.jpg")).toBe(
      "https://kim.github.io/dol/images/og-thumbnail.jpg",
    );
  });
  it("upgrades an http GitHub Pages address to https", () => {
    expect(ogImageUrl("http://kim.github.io/dol", "/images/og-thumbnail.jpg")).toBe(
      "https://kim.github.io/dol/images/og-thumbnail.jpg",
    );
  });
  it("leaves the thumbnail out when the site URL is unknown", () => {
    expect(ogImageUrl(undefined, "/images/og-thumbnail.jpg")).toBeUndefined();
  });
  it("leaves the thumbnail out for local addresses", () => {
    expect(ogImageUrl("http://localhost:8080", "/images/og-thumbnail.jpg")).toBeUndefined();
  });
});

describe("normalizeSiteUrl", () => {
  it("returns an https address with a trailing slash", () => {
    expect(normalizeSiteUrl("http://kim.github.io/dol")).toBe("https://kim.github.io/dol/");
  });
});
