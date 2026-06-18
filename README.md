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

## Before launch — TODO

- [ ] Set the real product name throughout (currently the working name "Flask SaaS Starter").
- [ ] Replace the `#` buy links in `index.html` with the Lemon Squeezy / Gumroad checkout URLs
      (Phase 7).
- [ ] Add screenshots and/or a short demo video to the landing page.
- [ ] Confirm pricing (currently Solo £99 / Team £199 / Agency £399).
- [ ] Point the README "Deploy to Render" expectations and docs links at the live product repo.
