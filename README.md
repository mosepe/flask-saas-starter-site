# SaaSling - marketing & docs site

The public marketing and documentation site for SaaSling, a Flask SaaS starter. Built with
**Vite + React** in a terminal/engineer aesthetic, statically exported and deployed to
**GitHub Pages** via GitHub Actions. Kept in its own **public** repo so the product source
can stay private.

## Stack

- **Vite + React**: single-page landing, built to static HTML/CSS/JS in `dist/`.
- **JetBrains Mono** (self-hosted via `@fontsource`): the monospace terminal look.
- **GitHub Actions** -> GitHub Pages: builds on every push to `main` and publishes `dist/`.

## Structure

```text
index.html              Vite entry (mounts the React app)
src/
  main.jsx              React entry
  App.jsx               the whole landing page (content lives in arrays up top)
  styles.css            terminal/engineer design system + tokens
public/                 copied to the build root as-is (NOT processed by Vite)
  docs/                 static docs pages (index, quickstart, setup-wizard)
  assets/styles.css     stylesheet for the static docs pages
  favicon.svg
  CNAME                 custom domain (saasling.dev)
  .nojekyll
vite.config.js          base: '/' (served at the saasling.dev apex)
.github/workflows/deploy.yml   build + deploy to Pages
```

> The `docs/` pages are still plain static HTML in `public/`. They keep their own
> stylesheet and relative links, so Vite copies them through untouched.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy

Deployment is automatic: **push to `main`** and the `Deploy site to GitHub Pages`
workflow builds and publishes.

**One-time setup (required):** in the repo, go to **Settings → Pages → Build and
deployment → Source** and set it to **GitHub Actions** (it was previously "Deploy from a
branch"). After that, every push to `main` ships.

Live at **https://saasling.dev**.

### Custom domain

Configured: `public/CNAME` holds `saasling.dev`; DNS is on Cloudflare (apex `CNAME @ →
mosepe.github.io` + `www`, both DNS-only/grey-cloud, relying on CNAME flattening); Vite
`base` is `'/'`. After the first deploy, enable **Settings → Pages → Enforce HTTPS** once
GitHub has issued the certificate.

## Decisions (locked)

- **Payment:** Lemon Squeezy (Merchant of Record, handles global VAT/sales tax).
- **Delivery:** private GitHub repo access. During launch, buyer invites are processed manually;
  automate via a Lemon Squeezy webhook later.
- **Pricing:** two tiers: Personal £129, Team £299 (one-time, 1 year of updates).
- **Name:** SaaSling. Domain `saasling.dev`, GitHub org `saasling`, PyPI/npm `saasling`.

## Before launch TODO

- [x] Decide the product name: **SaaSling** (saasling.dev).
- [x] Wire the two Lemon Squeezy checkout URLs in `src/App.jsx`.
- [x] Set up the private product repo + a manual buyer-invite process for launch.
- [ ] Add screenshots and/or a short demo to the landing page.

## Manual launch fulfillment

Until repo access is automated, process each paid order with this checklist:

1. Confirm the Lemon Squeezy order is paid and note the buyer email, plan, and order ID.
2. Ask the buyer for their GitHub username if it was not provided with the order.
3. Invite the GitHub username to `SaaSling/starter` with read access.
4. Send the repo link, quickstart link, and support contact to the buyer.
5. Record the order ID, buyer email, GitHub username, plan, invite date, and update expiry.
