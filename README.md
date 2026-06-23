# Flask SaaS Starter — marketing & docs site

The public marketing and documentation site for the Flask SaaS Starter. Built with
**Vite + React** in a terminal/engineer aesthetic, statically exported and deployed to
**GitHub Pages** via GitHub Actions. Kept in its own **public** repo so the product source
can stay private.

## Stack

- **Vite + React** — single-page landing, built to static HTML/CSS/JS in `dist/`.
- **JetBrains Mono** (self-hosted via `@fontsource`) — the monospace terminal look.
- **GitHub Actions** → GitHub Pages — builds on every push to `main` and publishes `dist/`.

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
  .nojekyll
vite.config.js          base: '/flask-saas-starter-site/' for the Pages subpath
.github/workflows/deploy.yml   build + deploy to Pages
```

> The `docs/` pages are still plain static HTML in `public/`. They keep their own
> stylesheet and relative links, so Vite copies them through untouched.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/flask-saas-starter-site/
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy

Deployment is automatic: **push to `main`** and the `Deploy site to GitHub Pages`
workflow builds and publishes.

**One-time setup (required):** in the repo, go to **Settings → Pages → Build and
deployment → Source** and set it to **GitHub Actions** (it was previously "Deploy from a
branch"). After that, every push to `main` ships.

Live at `https://mosepe.github.io/flask-saas-starter-site/`.

### Custom domain (optional)

Add the domain to `public/CNAME`, set it under **Settings → Pages → Custom domain**, and
point DNS at GitHub Pages. With an apex domain you can drop the `base` in `vite.config.js`
back to `'/'`.

## Decisions (locked)

- **Payment:** Lemon Squeezy (Merchant of Record — handles global VAT/sales tax).
- **Delivery:** private GitHub repo access (manual invites to launch; automate via a Lemon
  Squeezy webhook later).
- **Pricing:** two tiers — Personal £129, Team £299 (one-time, 1 year of updates).
- **Name:** undecided — placeholder is "Flask SaaS Starter".

## Before launch — TODO

- [ ] Decide the product name (invented word; verify .com/.dev + GitHub org), then global-swap.
- [ ] Paste the two Lemon Squeezy checkout URLs over the `#` placeholders in `src/App.jsx`
      (the `PLANS` array — look for the `TODO` comments).
- [ ] Add screenshots and/or a short demo to the landing page.
- [ ] Set up the private product repo + a buyer-invite process (manual to start).
