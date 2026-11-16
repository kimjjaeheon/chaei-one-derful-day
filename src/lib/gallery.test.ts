import { describe, expect, it } from "vitest";
import { stepIndex } from "./gallery";

describe("stepIndex", () => {
  it("goes to the next photo", () => {
    expect(stepIndex(0, 1, 6)).toBe(1);
  });
  it("wraps from the last photo to the first", () => {
    expect(stepIndex(5, 1, 6)).toBe(0);
  });
  it("wraps from the first photo back to the last", () => {
    expect(stepIndex(0, -1, 6)).toBe(5);
  });
});
