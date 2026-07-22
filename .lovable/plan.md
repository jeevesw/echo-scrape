# Scope: Migrating to Lovable's new SSR stack

The current site is a Vite + React SPA using React Router. Lovable's new SSR default (from May 2026) is **TanStack Start** — a different framework, not a toggle. So this is a **rebuild in a new Lovable project**, then a domain cutover, not an in-place upgrade.

## What carries over vs. what gets rebuilt

**Carries over unchanged**
- Lovable Cloud backend (database, auth, storage, edge functions) — the new project points at the same backend, so all blog posts, users, roles, media, and edge functions stay put.
- Tailwind design tokens (brand pink, dark grey, typography rules from memory).
- All static assets (images, videos, PDFs, SVGs — Read & Co. wireframes, Mycelia logo, sizzle reel, Proscenium files, etc.).
- Blog block content (JSONB) — the `BlockRenderer` gets ported, data is untouched.
- Copy, SEO metadata, JSON-LD schemas.

**Gets rebuilt**
- Routing: React Router → TanStack Router (file-based routes under `src/routes/`).
- Data fetching: current client-side Supabase calls → route `loader`s for SSR (blog pages especially, so posts server-render for SEO/AI crawlers).
- `<Helmet>` / manual `<head>` tags → TanStack `head()` per route.
- Any component using `window` / `document` at module top-level needs a client-only guard.
- Admin/CMS pages: kept client-side (no SEO benefit), minimal changes.

## Page/route inventory to port

Public: `/`, `/about`, `/services` + 6 service subpages, `/case-studies` + detail pages, `/blog` + post pages, `/newsletter`, `/contact`, `/privacy-policy`, `/proscenium-test`.
Admin: `/admin/*` (blog CMS, auth-gated).
Components: Header, Footer, ClientLogoCarousel, FeaturedCampaigns, ReelHero (video), NewsletterSignup, BlockRenderer, PasswordGate, quiz screens.

## Recommended phased approach

1. **Spin up new SSR project** (fresh Lovable project on TanStack Start default). Point at the existing Lovable Cloud backend.
2. **Port design system + layout** (Tailwind config, tokens, Header, Footer, fonts).
3. **Port marketing pages** (home + sizzle reel hero, services, case studies, about, contact, privacy, newsletter) — these benefit most from SSR.
4. **Port blog** with SSR loaders (biggest SEO win — posts render server-side with full HTML and JSON-LD).
5. **Port Proscenium quiz** (`/proscenium-test`) — client-side interactive, straightforward.
6. **Port admin CMS** (client-side, auth-gated).
7. **QA on `*.lovable.app`**: crawl test, Lighthouse, GA4 verification, all forms, auth flow, admin CRUD.
8. **Domain cutover**: move `trapezemedia.co.uk` DNS from the old project to the new one, then unpublish the old.

## Effort estimate (rough)

- Steps 1–3: ~1 focused rebuild session
- Step 4 (blog with SSR loaders): ~1 session
- Steps 5–6: ~1 session
- Step 7–8: short session + DNS wait

Total: roughly **3–4 working sessions** end-to-end, assuming no scope additions.

## Risks / things to know

- **Loader serialization**: TanStack SSR loaders can only return JSON-serializable data — no React components, no Lucide icons, no functions. Any current pattern that passes icons/components through props needs restructuring (reconstruct in the component from a string ID).
- **GA4** (`G-Y32T0LNV4D`) gets re-added to the new project's root document.
- **Custom domain downtime**: swapping the domain to the new project causes a brief propagation window.
- **Both projects live during rebuild**: the current site stays up on `trapezemedia.co.uk` until cutover; the new one lives on its Lovable preview URL.

## What I'd need from you to start

1. Confirm the plan and that you want a new project (I can't create it — you'd click "New Project" on Lovable, then invite me in).
2. Confirm we reuse the same Lovable Cloud backend (recommended — zero data migration).
3. Any pages/features you want to **change** during the rebuild vs. straight port.

## Alternative: do nothing

Worth restating — your current Vite SPA is pre-rendered on-request by Lovable's hosting, so Google and AI crawlers already see rendered HTML. Unless you have a specific SEO signal telling you SSR would move the needle, staying put is a valid choice.
