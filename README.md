# Flask SaaS Starter — marketing & docs site

The public, static marketing and documentation site for the Flask SaaS Starter. Plain HTML/CSS,
no build step — deploys to GitHub Pages directly. Kept in its own **public** repo so the product
source can stay private.

## Structure

```text
index.html          Landing / sales page
assets/styles.css   Shared styles
docs/index.html     Docs hub
docs/quickstart.html
docs/setup-wizard.html
.nojekyll           Serve files as-is (skip Jekyll processing)
```

## Run locally

It's static — open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Publish to GitHub Pages

1. Create a **public** repo (e.g. `flask-saas-starter-site`) and push this folder to it.
2. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch**, branch
   `main`, folder `/ (root)`. Save.
3. The site goes live at `https://<user>.github.io/<repo>/` within a minute or two.

### Custom domain (optional)

Add a `CNAME` file containing your domain (e.g. `flaskstarter.dev`), set it under
**Settings → Pages → Custom domain**, and point your DNS at GitHub Pages.

## Decisions (locked)

- **Payment:** Lemon Squeezy (Merchant of Record — handles global VAT/sales tax).
- **Delivery:** private GitHub repo access (manual invites to launch; automate via a Lemon
  Squeezy webhook later).
- **Pricing:** two tiers — Personal £129, Team £299 (one-time, 1 year of updates).
- **Name:** undecided — needs a genuinely *invented*, ownable word (real/vessel words like
  Cask, Plinth, Caskade, Phial are all taken in dev tooling). Placeholder is "Flask SaaS Starter".

## Before launch — TODO

- [ ] Decide the product name (invented word; verify .com/.dev + GitHub org), then global-swap it.
- [ ] Create the Lemon Squeezy account + two products (Personal/Team) and paste the checkout URLs
      over the `#` buy links in `index.html`.
- [ ] Add screenshots and/or a short demo video to the landing page.
- [ ] Set up the private product repo + a buyer-invite process (manual to start).
