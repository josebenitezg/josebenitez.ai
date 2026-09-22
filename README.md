# josebenitez.ai

Professional site for José Benítez, focused on Physical AI and correlations
across compute, energy, infrastructure, and model shifts.

## Stack

- Next.js 15 App Router
- React 18 and TypeScript
- Tailwind CSS
- Filesystem Markdown content
- Optional Supabase-backed post likes
- Vercel Analytics

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

The site builds without environment variables. To enable post likes, copy
`.env.example` to `.env.local` and provide:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

The table definition and policies are documented in
`assets/supabase-schema.sql`. When Supabase is not configured, the like control
is hidden and the API degrades without failing the site.

## Content

Physical AI field notes live in `content/posts` as Markdown with frontmatter.
Personal and general-interest writing is staged outside the public content tree;
see `docs/joselo-blog-migration.md` for the source-to-destination manifest.

## Personal-content redirects

Permanent redirects to `joselo.blog` are implemented but disabled by default.
After the new domain serves the approved production deployment, set this
server-side Vercel environment variable and redeploy:

```env
JOSELO_BLOG_REDIRECTS_ENABLED=true
```

The switch covers `/lab`, `/biohacking`, `do-it-anyway`, `marco-existencial`,
and `hello-world`. It deliberately does not redirect the Physical AI or
Correlations posts.

### Design

One centered 640px column, text only, on pure black. Geist Sans for text and
titles, Geist Mono for section labels, dates, and metadata, in three grays
(ink, muted, faint). Pages are
Home, Writing, About, and the articles. `/work`, `/capabilities`, and
`/contact` permanently redirect to `/about`.

### Browser checks

```bash
npm ci
npx playwright install chromium
npm run check
npm run test:browser
```

The browser suite starts the production build on port 3107 (or reuses a local
server on that port). It checks every route at 1440, 768, 390, and 320 pixels for
shared styles and horizontal overflow, client-side navigation, redirects, internal
links, and navigation without JavaScript. Screenshots are written to the ignored
`test-results/` folder.
