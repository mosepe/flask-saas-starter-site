import { useState } from 'react'

// --- content -----------------------------------------------------------------

const BOOT = [
  ['ok', 'auth', 'registration · invites · password reset · roles'],
  ['ok', 'tenancy', 'workspace isolation, enforced workspace-first'],
  ['ok', 'billing', 'Stripe checkout · webhooks · entitlements'],
  ['ok', 'storage', 'local or S3/R2 · upload validation'],
  ['ok', 'brand', 'starter brand + per-workspace white-label'],
  ['ok', 'deploy', 'one-click Render blueprint + Postgres'],
]

const PROBLEMS = [
  ['authentication', 'registration, invitations, password reset, roles'],
  ['multi-tenancy', "workspace isolation that doesn't leak between customers"],
  ['billing', 'Stripe checkout, webhooks, plans, entitlement limits'],
  ['file uploads', 'validation, secure serving, S3/R2 storage'],
  ['deployment', 'prod config, migrations, health checks, secrets'],
  ['operations', 'superadmin tooling, audit trails, tests you trust'],
]

const MODULES = [
  ['workspaces', 'Workspace-based isolation with optional group scoping, enforced workspace-first on every query.'],
  ['auth', 'Registration, invitations, password reset, and role-based access out of the box.'],
  ['billing', 'Stripe checkout, webhooks, plan entitlements, resource limits, and billing snapshots.'],
  ['storage', 'Local or S3/R2-compatible storage with upload validation and secure serving.'],
  ['branding', 'Centralized starter brand plus per-workspace white-label theming for your customers.'],
  ['superadmin', 'Protected operator routes, impersonation, and audit events.'],
  ['setup', 'starter init configures a fresh clone; starter doctor preflights production.'],
  ['deploy', 'One-click Render blueprint with managed Postgres, migrations, and a health check.'],
  ['tests', 'Solid Python test coverage across tenancy, entitlements, billing, and storage.'],
]

const STEPS = [
  ['clone', 'Get the source via your private repo invite or a versioned release.'],
  ['configure', 'Run starter init — it writes .env, generates secrets, sets your brand.'],
  ['deploy', 'Click Deploy to Render; it provisions the app and the database.'],
  ['build', 'Replace the demo resource with your own feature and ship.'],
]

const FAQ = [
  ['What exactly do I get?', "The full source of a production-oriented Flask SaaS app — auth, multi-tenant workspaces, Stripe billing, entitlements, storage, branding, superadmin tooling, tests, a setup wizard, a doctor command, and a Render deployment blueprint — plus the docs."],
  ['Can I build commercial products with it?', "Yes. Build and sell as many of your own products as you like. You don't need to credit or disclose the starter in what you ship."],
  ['Can I resell or share the starter?', "No. You may use and modify it, but you can't resell, redistribute, or republish the starter itself."],
  ["What's the tech stack?", 'Flask 3, SQLAlchemy, Flask-Migrate, PostgreSQL (SQLite for local dev), Stripe, Resend for email, and S3/R2-compatible storage. Deploys to Render or any standard VPS.'],
  ['How is it delivered, and how do updates work?', 'You get access to a private GitHub repo — clone it and git pull to pull updates. Improvements ship as versioned releases; each tier includes one year of updates.'],
  ['Do you offer refunds?', "Because this is downloadable source code, sales are generally final — but reach out if something isn't as described."],
]

const PLANS = [
  {
    name: 'personal',
    price: '£129',
    featured: false,
    // TODO: replace '#' with the Lemon Squeezy checkout URL for the Personal tier
    href: '#',
    perks: ['one developer', 'full source code & docs', 'build unlimited products', 'private GitHub repo access', '1 year of updates'],
  },
  {
    name: 'team',
    price: '£299',
    featured: true,
    // TODO: replace '#' with the Lemon Squeezy checkout URL for the Team tier
    href: '#',
    perks: ['a whole company — unlimited devs', 'full source code & docs', 'build unlimited products', 'private GitHub repo access', '1 year of updates'],
  },
]

// --- primitives --------------------------------------------------------------

function Prompt({ children }) {
  return (
    <span className="cmd">
      <span className="sigil">$</span> {children}
    </span>
  )
}

function SectionHead({ tag, title, sub }) {
  return (
    <header className="sec-head">
      <p className="sec-tag"># {tag}</p>
      <h2 className="sec-title">{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </header>
  )
}

function CopyCmd({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch { /* clipboard blocked — no-op */ }
  }
  return (
    <button className="copycmd" onClick={copy} title="Copy">
      <span className="sigil">$</span> {text}
      <span className="copytag">{copied ? 'copied' : 'copy'}</span>
    </button>
  )
}

function Win({ title, children, className = '' }) {
  return (
    <div className={`win ${className}`}>
      <div className="win-bar">
        <span className="lights"><i /><i /><i /></span>
        <span className="win-title">{title}</span>
      </div>
      <div className="win-body">{children}</div>
    </div>
  )
}

// --- app ---------------------------------------------------------------------

export default function App() {
  const year = new Date().getFullYear()
  return (
    <>
      <header className="topbar">
        <nav className="nav wrap">
          <a className="brand" href="./">
            <span className="brand-path">~/flask-saas-starter</span>
            <span className="caret" />
          </a>
          <div className="nav-links">
            <a href="#modules" className="hide-sm">modules</a>
            <a href="#flow" className="hide-sm">how</a>
            <a href="#pricing">pricing</a>
            <a href="docs/">docs</a>
            <a href="#pricing" className="nav-buy">buy</a>
          </div>
        </nav>
      </header>

      <main>
        {/* hero */}
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="kicker">// Python · Flask · multi-tenant · Stripe · Render</p>
            <h1>Ship the product,<br />not the plumbing.</h1>
            <p className="lead">
              A production-oriented, multi-tenant Flask SaaS starter. Clone it, run the
              setup wizard, deploy to Render — then build your actual feature instead of
              rebuilding auth, billing, and tenancy for the hundredth time.
            </p>
            <div className="cta">
              <a className="btn btn-primary" href="#pricing">get the starter</a>
              <a className="btn btn-ghost" href="docs/">read the docs</a>
            </div>
            <CopyCmd text="git clone <your-private-repo> && cd app && starter init" />
          </div>

          <Win title="bash — starter init" className="hero-win">
            <pre className="boot">
              <div className="boot-line"><Prompt>starter init</Prompt></div>
              <div className="boot-line dim">provisioning chassis…</div>
              {BOOT.map(([, name, desc], i) => (
                <div className="boot-line" style={{ '--i': i }} key={name}>
                  <span className="tick">✓</span>
                  <span className="mod">{name}</span>
                  <span className="boot-desc">{desc}</span>
                </div>
              ))}
              <div className="boot-line ready">
                <span className="tick">✓</span> ready — now build your feature
                <span className="cursor" />
              </div>
            </pre>
          </Win>
        </section>

        {/* problem */}
        <section className="wrap">
          <SectionHead
            tag="the problem"
            title="Every SaaS starts with the same months of plumbing"
            sub="Before you write a single line of your product, you need all of this — done properly."
          />
          <ul className="problems">
            {PROBLEMS.map(([k, v]) => (
              <li key={k}>
                <span className="x">✗</span>
                <span className="p-key">{k}</span>
                <span className="p-val">{v}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* modules / features */}
        <section id="modules" className="wrap">
          <SectionHead
            tag="modules"
            title="A complete SaaS chassis, in Flask"
            sub="Everything below is already implemented, tested, and documented."
          />
          <div className="modgrid">
            {MODULES.map(([name, desc]) => (
              <article className="mod-card" key={name}>
                <h3><span className="slash">/</span>{name}<span className="ext">/</span></h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* flow */}
        <section id="flow" className="wrap">
          <SectionHead tag="how it works" title="From clone to live in four steps" />
          <ol className="flow">
            {STEPS.map(([name, desc], i) => (
              <li key={name}>
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </div>
                {i < STEPS.length - 1 && <span className="pipe">│</span>}
              </li>
            ))}
          </ol>
        </section>

        {/* pricing */}
        <section id="pricing" className="wrap">
          <SectionHead
            tag="pricing"
            title="One-time purchase. Build unlimited products."
            sub="Use it to build your own commercial products. You may not resell the starter itself."
          />
          <div className="plans">
            {PLANS.map((p) => (
              <Win key={p.name} title={`${p.name}.toml`} className={`plan ${p.featured ? 'is-featured' : ''}`}>
                {p.featured && <span className="plan-flag">// recommended</span>}
                <div className="plan-price">{p.price}<small> one-time</small></div>
                <ul className="plan-perks">
                  {p.perks.map((perk) => (
                    <li key={perk}><span className="tick">✓</span>{perk}</li>
                  ))}
                </ul>
                <a className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`} href={p.href}>
                  get {p.name}
                </a>
              </Win>
            ))}
          </div>
        </section>

        {/* faq */}
        <section id="faq" className="wrap">
          <SectionHead tag="faq" title="Questions" />
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary><span className="q-mark">?</span>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* license */}
        <section className="wrap">
          <SectionHead tag="license" title="Simple commercial license" />
          <div className="license">
            <p><span className="c">{'/*'}</span></p>
            <p><span className="c"> *</span> <strong>You may</strong> use and modify the code to build your own commercial or
              non-commercial products, deploy unlimited products, and keep any version you received.</p>
            <p><span className="c"> *</span> <strong>You may not</strong> resell, redistribute, sublicense, or republish the
              starter itself. Built products need no attribution. Full terms ship with the source.</p>
            <p><span className="c"> */</span></p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span><span className="sigil">$</span> © {year} flask-saas-starter<span className="cursor" /></span>
          <span className="foot-links">
            <a href="docs/">docs</a> · <a href="#pricing">pricing</a> · <a href="#faq">faq</a>
          </span>
        </div>
      </footer>
    </>
  )
}
