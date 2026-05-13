import Link from "next/link";
import { getVerticalBundle } from "@/lib/data";

export default function NotFound() {
  const { strings } = getVerticalBundle();

  return (
    <main
      id="main"
      className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center sm:px-6"
    >
      <p className="text-sm font-medium text-dd-accent">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Entry not found</h1>
      <p className="text-sm text-dd-muted">
        That id is not in the stub catalog for this vertical build.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg px-4 py-2 text-sm font-semibold text-white no-underline"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        {strings.detailBack}
      </Link>
    </main>
  );
}
