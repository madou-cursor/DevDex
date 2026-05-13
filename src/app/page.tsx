import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";
import { allTypes, getVerticalBundle } from "@/lib/data";

export default function HomePage() {
  const { entries, strings } = getVerticalBundle();
  const types = allTypes(entries);

  return (
    <main id="main">
      <Suspense
        fallback={
          <div className="mx-auto max-w-5xl space-y-8 px-4 pb-16 pt-8 sm:px-6">
            <div className="h-10 w-48 animate-pulse rounded-lg bg-dd-card" />
            <div className="h-24 max-w-2xl animate-pulse rounded-lg bg-dd-card" />
            <div className="h-10 max-w-md animate-pulse rounded-lg bg-dd-card" />
          </div>
        }
      >
        <CatalogClient entries={entries} strings={strings} typeOptions={types} />
      </Suspense>
    </main>
  );
}
