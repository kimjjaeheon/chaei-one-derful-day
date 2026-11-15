import { describe, expect, it } from "vitest";
import { resolvePhotoSrc } from "./photo-src";

describe("resolvePhotoSrc", () => {
  it("keeps photo paths as-is at the site root", () => {
    expect(resolvePhotoSrc("/images/main.jpg", "/")).toBe("/images/main.jpg");
  });

  it("prefixes the repo folder so photos load on GitHub Pages", () => {
    expect(resolvePhotoSrc("/images/main.jpg", "/dday/")).toBe("/dday/images/main.jpg");
  });

  it("accepts paths written without a leading slash", () => {
    expect(resolvePhotoSrc("images/main.jpg", "/dday/")).toBe("/dday/images/main.jpg");
  });

  it("leaves absolute URLs untouched", () => {
    expect(resolvePhotoSrc("https://cdn.example.com/a.jpg", "/dday/")).toBe(
      "https://cdn.example.com/a.jpg",
    );
  });
});
