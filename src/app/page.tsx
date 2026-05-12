import { Header } from "@/components/Header";
import { CatalogClient } from "@/components/CatalogClient";
import { getBranding } from "@/lib/branding";
import { allTypes, getActiveVerticalId, getVerticalBundle } from "@/lib/data";

export default function HomePage() {
  const branding = getBranding();
  const { entries, strings } = getVerticalBundle();
  const types = allTypes(entries);

  return (
    <>
      <Header branding={branding} verticalLabel={strings.verticalLabel} />
      <main id="main">
        <CatalogClient entries={entries} strings={strings} typeOptions={types} />
      </main>
      <footer className="border-t border-dd-brand/10 bg-dd-card py-6 text-center text-xs text-dd-muted">
        <p>
          DevDex demo · fixtures only · vertical:{" "}
          <code className="rounded bg-dd-bg px-1 py-0.5 font-mono text-dd-fg">
            {getActiveVerticalId()}
          </code>
        </p>
      </footer>
    </>
  );
}
