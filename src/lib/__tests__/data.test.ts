import { describe, expect, it } from "vitest";
import { allTypes, getActiveVerticalId, getVerticalBundle } from "@/lib/data";

describe("getActiveVerticalId()", () => {
  it("defaults to 'banking' when NEXT_PUBLIC_VERTICAL is unset", () => {
    // NEXT_PUBLIC_VERTICAL is not defined in this test process, so the
    // default branch should be exercised.
    expect(getActiveVerticalId()).toBe("banking");
  });
});

describe("getVerticalBundle()", () => {
  const bundle = getVerticalBundle();

  it("returns the banking bundle by default", () => {
    expect(bundle.id).toBe("banking");
  });

  it("ships exactly 12 banking products", () => {
    expect(bundle.entries).toHaveLength(12);
  });

  it("has localised strings (uiSearchLabel is set)", () => {
    expect(bundle.strings.uiSearchLabel).toBe("Buscar");
    expect(bundle.strings.uiHomeLabel).toBe("Inicio");
    expect(bundle.strings.uiFooterDisclaimer).toContain("BBVA España");
  });
});

describe("allTypes()", () => {
  it("includes the six banking categories (modulo any known data bugs)", () => {
    const { entries } = getVerticalBundle();
    const types = allTypes(entries);
    // We intentionally do NOT assert the exact set here: a planted bug
    // (trailing whitespace in one entry's types) is part of the demo and
    // surfaces as a duplicate sidebar category. Tests should still pass.
    for (const cat of [
      "Cuentas",
      "Tarjetas",
      "Préstamos",
      "Inversión",
      "Seguros",
    ]) {
      expect(types).toContain(cat);
    }
    expect(types.some((t) => t.trim() === "Hipotecas")).toBe(true);
  });
});
