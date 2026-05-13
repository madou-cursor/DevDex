import { allTypes } from "@/lib/data";
import type { DexEntry } from "@/lib/types";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  count?: number;
};

export type NavGroup = {
  id: string;
  label: string;
  items: NavItem[];
};

export function getNav(entries: DexEntry[], filterLabel: string): NavGroup[] {
  const types = allTypes(entries);
  const counts = new Map<string, number>();
  for (const t of types) counts.set(t, 0);
  for (const e of entries) {
    for (const t of e.types) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }

  const primary: NavGroup = {
    id: "primary",
    label: "Primary",
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "catalog", label: "Catalog", href: "/#catalog" },
    ],
  };

  const categories: NavGroup = {
    id: "categories",
    label: filterLabel,
    items: types.map((t) => ({
      id: `type-${t}`,
      label: t,
      href: `/?type=${encodeURIComponent(t)}`,
      count: counts.get(t) ?? 0,
    })),
  };

  return [primary, categories];
}
