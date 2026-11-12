import { describe, expect, it } from "vitest";
import { daysUntil, ddayLabel } from "./dday";

const party = new Date("2027-01-24T11:00:00+09:00");

describe("돌잔치 D-day", () => {
  it("counts 10 days from Jan 14 2027 in Korea", () => {
    expect(daysUntil(party, new Date("2027-01-14T09:00:00+09:00"))).toBe(10);
  });

  it("is D-DAY on the morning of Jan 24 2027 in Korea, even before 11am", () => {
    const days = daysUntil(party, new Date("2027-01-24T00:30:00+09:00"));
    expect(ddayLabel(days)).toBe("D-DAY");
  });

  it("uses Korea's date, not UTC: Jan 23 20:00 UTC is already Jan 24 in Korea", () => {
    expect(daysUntil(party, new Date("2027-01-23T20:00:00Z"))).toBe(0);
  });

  it("shows D-1 on Jan 23 2027", () => {
    expect(ddayLabel(daysUntil(party, new Date("2027-01-23T12:00:00+09:00")))).toBe("D-1");
  });
});
