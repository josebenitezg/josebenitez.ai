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
