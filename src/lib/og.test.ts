import { describe, expect, it } from "vitest";
import { ogImageUrl } from "./og";

describe("ogImageUrl", () => {
  it("joins the GitHub Pages site URL and the thumbnail path", () => {
    expect(ogImageUrl("https://kim.github.io/dol", "/images/og-thumbnail.jpg")).toBe(
      "https://kim.github.io/dol/images/og-thumbnail.jpg",
    );
  });
  it("leaves the thumbnail out when the site URL is unknown", () => {
    expect(ogImageUrl(undefined, "/images/og-thumbnail.jpg")).toBeUndefined();
  });
  it("leaves the thumbnail out for non-https site URLs", () => {
    expect(ogImageUrl("http://localhost:8080", "/images/og-thumbnail.jpg")).toBeUndefined();
  });
});
