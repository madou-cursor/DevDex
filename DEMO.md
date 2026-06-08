# Cursor 101 — Live demo playbook (BBVA España)

This document is the **presenter's script** for a ~20‑minute live demo that exercises the four Cursor 101 fundamentals on this codebase:

1. **Plan Mode** — propose a structured plan before any code is written.
2. **Agent** — execute the plan with multi-file edits.
3. **Generate tests** — produce real unit tests.
4. **Debug with a structured plan** — reproduce a reported issue, hypothesise, fix.

Everything below assumes the audience is watching your screen. The repo is already running:

```bash
npm install
npm run dev      # http://localhost:3000  (banking vertical by default)
npm test         # 5 sanity tests green out of the box
```

---

## The user story (read this aloud at the start)

> **Como** cliente potencial de BBVA España que está mirando una hipoteca,
> **quiero** disponer de una **Calculadora de Hipoteca** directamente en la página del producto que me indique la **cuota mensual**, los **intereses totales** y si la hipoteca es **asequible** según mis ingresos (DTI),
> **para** poder decidir si solicitarla sin salir del catálogo.

### Acceptance criteria (the audience can verify these live)

- On `/entry/bbva-hipoteca-fija` **and** `/entry/bbva-hipoteca-variable`, a **Calculadora de Hipoteca** panel appears under the existing **Detalles** section. The panel must **not** appear on non-mortgage products.
- Inputs (with sensible defaults): loan amount (€), term (years), annual interest rate (%), gross monthly income (€).
- Outputs:
  - Monthly payment (€, rounded to cents)
  - Total interest paid over the life of the loan (€)
  - Total paid (€)
  - An **Asequible / Revisar** badge based on the rule **monthly payment / gross monthly income ≤ 35 %**.
- At least **6 unit tests** in `src/lib/__tests__/finance.test.ts` cover: standard 30-year case, zero-interest case, high-rate case, rounding to cents, DTI exactly at threshold, DTI above threshold.
- `npm test`, `npm run lint`, and `npm run build` are all green.

---

## Step 0 — Set the stage (~2 min)

1. Open the project root in Cursor.
2. Show the running app on `localhost:3000`: sidebar with **Cuentas / Tarjetas / Hipotecas / Préstamos / Inversión / Seguros**, full Spanish UI.
3. Click into **Hipoteca Fija Demo** → highlight the existing **Detalles** stats.
4. Open a terminal and run `npm test` — confirm 5 sanity tests pass. Tell the audience: *"Vitest is already wired in; everything Cursor writes next will run with `npm test`."*

---

## Step 1 — Plan Mode (~4 min)

**Open Plan Mode** in Cursor and paste this prompt verbatim:

> I want to add a **Mortgage Affordability Calculator** on the product detail page for entries whose `types` include `Hipotecas`.
>
> Read this repo and produce a **structured plan** with:
> - File-level changes (what to add, what to edit, what to leave alone).
> - The data-model extension needed on `DexEntry` (an optional `mortgageTerms` field).
> - Pure functions to add to a new `src/lib/finance.ts` module: monthly payment, total interest/total paid, and an affordability check using a DTI ≤ 35 % threshold.
> - Edge cases (zero interest rate, very high rate, rounding to cents, DTI exactly at threshold).
> - A test list (each test as a sentence) for `src/lib/__tests__/finance.test.ts`.
>
> **Do not write any code yet.** Stop after the plan.

Talk track while Cursor thinks:
- "Notice it's exploring the repo before proposing anything — that's the whole point of Plan Mode."
- When the plan appears: *read the file-level changes aloud*. Audience should see the touchpoints across `src/lib/types.ts`, `src/lib/finance.ts` (new), `src/data/verticals/banking/entries.json`, `src/components/MortgageCalculator.tsx` (new), `src/app/entry/[id]/page.tsx`.

---

## Step 2 — Agent: multi-file execution (~6 min)

**Switch from Plan Mode to Agent.** Paste:

> Execute the plan you just proposed. Concretely:
> 1. Create `src/lib/finance.ts` exporting pure functions: `monthlyPayment(principal, annualRatePct, years)`, `amortizationTotals(principal, annualRatePct, years)` (returns `{ monthly, totalInterest, totalPaid }`), and `affordability({ monthlyPayment, grossMonthlyIncome, maxDti })` (returns `{ dti, ok }`, default `maxDti = 0.35`).
> 2. Extend `src/lib/types.ts`: add an optional `mortgageTerms?: { defaultPrincipalEUR: number; defaultRatePct: number; defaultYears: number }` to `DexEntry`.
> 3. Seed `bbva-hipoteca-fija` and `bbva-hipoteca-variable` in `src/data/verticals/banking/entries.json` with sensible demo defaults (e.g. 200 000 €, 25 years, 3.10 % fixed / 4.12 % variable TAE).
> 4. Add `src/components/MortgageCalculator.tsx` — a client component with the four inputs, computed outputs, and the `Asequible / Revisar` badge. All copy in Spanish.
> 5. In `src/app/entry/[id]/page.tsx`, render `<MortgageCalculator …/>` below the Detalles section **only** when `entry.types.includes("Hipotecas")` and `entry.mortgageTerms` is set.
>
> Then run `npm run build` to confirm everything compiles.

Talk track while the Agent runs:
- "Watch the file tree — it's touching the data layer, the type system, a new pure-functions module, a new client component, and a server-rendered page."
- "If `npm run build` fails, the Agent will see the TypeScript error and fix it without us asking — that's the loop."

When done: refresh `/entry/bbva-hipoteca-fija`. You should see the calculator with the seeded defaults and a live monthly payment.

---

## Step 3 — Generate tests (~4 min)

Paste:

> Write Vitest unit tests in `src/lib/__tests__/finance.test.ts` covering:
> 1. The standard 200 000 € / 25 y / 3.10 % case (assert monthly ≈ 960 € within ±1 €).
> 2. The **zero-interest** case: monthly payment is exactly `principal / months`.
> 3. A very high rate (15 %) over 30 years (smoke check — monotonicity).
> 4. Rounding: monthly payment is rounded to two decimals.
> 5. DTI exactly at the 35 % threshold (`ok === true`).
> 6. DTI above the 35 % threshold (`ok === false`).
>
> Then run `npm test` and report the result.

Audience should see Vitest emit `Test Files 2 passed, Tests 11 passed` (5 sanity + 6 new). If anything is red, talk through how Cursor reads the failure and revises the test or the implementation — same loop as before.

---

## Step 4 — Debug with a structured plan (~4 min)

> **Presenter note (do NOT read aloud):** the bug is real and lives in `src/data/verticals/banking/entries.json`. The entry `bbva-hipoteca-variable` has `"types": ["Hipotecas "]` — a stray **trailing space**. `allTypes()` in `src/lib/data.ts` treats it as a distinct category, so the sidebar renders two near-identical "Hipotecas" entries. Don't reveal the cause; let Cursor find it.

Paste:

> A reviewer reports: *"In the BBVA demo sidebar, the category **Hipotecas** appears twice with different counts. The catalog still loads, but the duplicate is confusing. The data file has only two mortgages and they both look correct at a glance."*
>
> Open **Plan Mode**, produce a **debug plan**: 3–5 hypotheses, the files you'd inspect for each, how you'd confirm or reject the root cause, and only then propose the fix. Do not modify any files until I switch you back to Agent.

Walk the audience through the hypothesis list (typical Cursor output will mention the nav helper, the `Set` semantics in `allTypes`, and case/whitespace handling in the data). Switch to **Agent** and say:

> Apply the fix you proposed and re-run `npm test`.

The Agent should normalise the offending entry (or `allTypes()`), reload the sidebar, and confirm a single **Hipotecas** entry with count = 2.

---

## Reset between runs

```bash
git restore --source=origin/demo/bbva-spain --staged --worktree \
  src/data/verticals/banking/entries.json \
  src/lib/types.ts \
  src/lib/data.ts \
  src/app/entry/[id]/page.tsx

rm -f \
  src/lib/finance.ts \
  src/components/MortgageCalculator.tsx \
  src/lib/__tests__/finance.test.ts
```

> Keep the planted bug in place between runs — the **Debug** step depends on it.

---

## Live-demo risks

- **`npm install` over a slow network.** Run it before the demo starts; the dev server can stay running for the whole session.
- **Browser cache hides the new calculator.** Hard-reload `/entry/bbva-hipoteca-fija` after Step 2.
- **Agent picks a different DTI threshold.** It's fine — narrate it as a judgement call and ask Cursor to align with the 35 % threshold in the AC.
- **The debug step finds the trailing space immediately.** Great — that's the point. Don't drag it out.

---

## Why this user story is well-suited to Cursor 101

| Fundamental | What this story exercises |
|---|---|
| Plan Mode | Forces the agent to traverse the repo (data, types, lib, components, app router) before writing anything. |
| Agent (multi-file) | Five files change in lockstep: lib, types, data, component, page. |
| Generate tests | Pure functions in `src/lib/finance.ts` make the test list crisp and the failures unambiguous. |
| Debug (structured) | A real, low-stakes bug already lives in the data — the audience sees Cursor confirm a hypothesis with evidence, not guess. |
