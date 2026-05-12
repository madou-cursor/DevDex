# Customize demo from company name (research → branch → GitHub)

**Input:** the user gives **only the company name**. If they did not give it, ask once for that single string.

**Mode:** Agent. Do the steps below in order.

## 0. Workspace check

If the repo root has **no** `src/` tree or **no** `.git/`, stop immediately: tell the user to **File → Open Folder** on their full local clone (not an empty or partial copy), then run this command again. Do not claim you pushed if git or sources were missing.

## 1. Research (public web only)

Use web search (and official site pages when relevant) to infer:

- What they do, typical customers, tone (for copy)
- Brand colors and typography hints from **public** brand/marketing pages (no paywalled or internal-only sources)
- Whether the product fits **`devtools`**, **`healthcare`**, or **`retail`** best; pick **one** existing vertical

If you cannot find reliable colors, keep the repo’s defaults and only change copy/metadata. Do not invent trademarked claims; keep catalog entries clearly **demo** wording.

## 2. Apply the demo

Update this project’s usual customization points (only what exists in the repo):

- Branding / theme: e.g. `src/lib/branding.ts`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/components/Header.tsx`
- Copy + sample catalog: `src/data/verticals/<chosen-vertical>/strings.json` and `entries.json`, and point the app’s default vertical to that folder if the code has a single default

Run **`npm run lint`** and **`npm run build`**; fix what you broke.

## 3. Branch, commit, push to GitHub

**Prerequisites (if any fail, stop and tell the user what to fix):**

- `git remote -v` shows **`origin`** on **github.com** (or GitHub Enterprise host they use)
- Working tree is clean enough to commit, or they accept committing current changes
- They have **push** rights (SSH key or credential already works on their machine)

**Git steps:**

1. From repo root, create a safe branch name: `demo/<slug>` where `<slug>` is a short lowercase hyphenated form of the company name (ASCII only; collapse spaces).
2. `git checkout -b demo/<slug>`
3. `git add -A` and `git commit -m "Demo: customize for <Company Name>"` (if there is nothing to commit, say so and do not force an empty commit).
4. `git push -u origin demo/<slug>`

Reply with: company researched, branch name, push result (or error), link pattern `https://github.com/<org>/<repo>/tree/demo/<slug>` if you know `org/repo` from `origin`, and a one-line summary of what changed.
