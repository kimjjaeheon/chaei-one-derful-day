import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhotoSlot } from "./PhotoSlot";

describe("PhotoSlot", () => {
  it("shows the photo when a path is set", () => {
    render(<PhotoSlot src="/images/main.jpg" alt="채이 사진" />);
    expect(screen.getByRole("img", { name: "채이 사진" })).toHaveAttribute("src", "/images/main.jpg");
  });

  it("shows an empty frame while no photo is set", () => {
    render(<PhotoSlot src="" alt="채이 사진" label="대표 사진" />);
    expect(screen.getByRole("img", { name: "채이 사진 (사진 준비 중)" })).toBeInTheDocument();
  });
});
