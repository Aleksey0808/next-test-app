import { describe, expect, it } from "vitest";
import { getStatusLabel, getConditionLabel } from "./inventory";

describe("getStatusLabel", () => {
  it("returns 'Свободен' for new product", () => {
    expect(getStatusLabel(1)).toBe("Свободен");
  });

  it("returns 'В ремонте' for used product", () => {
    expect(getStatusLabel(0)).toBe("В ремонте");
  });
});

describe("getConditionLabel", () => {
  it("returns 'Новый' for new product", () => {
    expect(getConditionLabel(1)).toBe("Новый");
  });

  it("returns 'Б/У' for used product", () => {
    expect(getConditionLabel(0)).toBe("Б/У");
  });
});
