"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DexEntry } from "@/lib/types";
import type { VerticalStrings } from "@/lib/types";
import { EntryCard } from "./EntryCard";

export function CatalogClient({
  entries,
  strings,
  typeOptions,
}: {
  entries: DexEntry[];
  strings: VerticalStrings;
  typeOptions: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("__all__");

  useLayoutEffect(() => {
    const t = searchParams.get("type");
    if (t && typeOptions.includes(t)) {
      setTypeFilter(t);
    } else {
      setTypeFilter("__all__");
    }
  }, [searchParams, typeOptions]);

  const setTypeFilterAndUrl = (value: string) => {
    setTypeFilter(value);
    const sp = new URLSearchParams(searchParams.toString());
    if (value === "__all__") {
      sp.delete("type");
    } else {
      sp.set("type", value);
    }
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname || "/", { scroll: false });
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return entries.filter((e) => {
      const typeOk = typeFilter === "__all__" || e.types.includes(typeFilter);
      if (!typeOk) return false;
      if (!needle) return true;
      const blob = `${e.name} ${e.description}`.toLowerCase();
      return blob.includes(needle);
    });
  }, [entries, q, typeFilter]);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 pb-16 pt-8 sm:px-6">
      <div id="catalog" className="scroll-mt-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-dd-fg sm:text-4xl">
          {strings.catalogTitle}
        </h1>
        <p className="max-w-2xl text-sm text-dd-muted sm:text-base">{strings.heroSubtitle}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-dd-fg">
          Search
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={strings.searchPlaceholder}
            className="rounded-lg border border-dd-brand/15 bg-white px-3 py-2 text-dd-fg shadow-inner outline-none ring-dd-accent/30 placeholder:text-dd-muted focus:ring-2"
          />
        </label>
        <label className="flex w-full flex-col gap-1 text-sm font-medium text-dd-fg sm:w-56">
          {strings.filterLabel}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilterAndUrl(e.target.value)}
            className="rounded-lg border border-dd-brand/15 bg-white px-3 py-2 text-dd-fg shadow-inner outline-none focus:ring-2 focus:ring-dd-accent/30"
          >
            <option value="__all__">All</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div
          className="rounded-xl border border-dashed border-dd-brand/20 bg-dd-card px-6 py-12 text-center"
          role="status"
        >
          <p className="text-lg font-medium text-dd-fg">{strings.emptyTitle}</p>
          <p className="mt-2 text-sm text-dd-muted">{strings.emptyBody}</p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <li key={e.id}>
              <EntryCard entry={e} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
