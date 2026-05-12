import type { DexEntry, VerticalId, VerticalStrings } from "./types";
import devtoolsEntries from "@/data/verticals/devtools/entries.json";
import devtoolsStrings from "@/data/verticals/devtools/strings.json";
import retailEntries from "@/data/verticals/retail/entries.json";
import retailStrings from "@/data/verticals/retail/strings.json";
import healthcareEntries from "@/data/verticals/healthcare/entries.json";
import healthcareStrings from "@/data/verticals/healthcare/strings.json";

const bundles = {
  devtools: {
    entries: devtoolsEntries as unknown as DexEntry[],
    strings: devtoolsStrings as VerticalStrings,
  },
  retail: {
    entries: retailEntries as unknown as DexEntry[],
    strings: retailStrings as VerticalStrings,
  },
  healthcare: {
    entries: healthcareEntries as unknown as DexEntry[],
    strings: healthcareStrings as VerticalStrings,
  },
} as const;

const ALLOWED: VerticalId[] = ["devtools", "retail", "healthcare"];

export function getActiveVerticalId(): VerticalId {
  const raw = (process.env.NEXT_PUBLIC_VERTICAL || "devtools").toLowerCase();
  if (ALLOWED.includes(raw as VerticalId)) return raw as VerticalId;
  return "devtools";
}

export function getVerticalBundle() {
  const id = getActiveVerticalId();
  return { id, ...bundles[id] };
}

export function getEntryById(id: string): DexEntry | undefined {
  const { entries } = getVerticalBundle();
  return entries.find((e) => e.id === id);
}

export function allTypes(entries: DexEntry[]): string[] {
  const s = new Set<string>();
  for (const e of entries) for (const t of e.types) s.add(t);
  return [...s].sort((a, b) => a.localeCompare(b));
}
