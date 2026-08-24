# joselo.blog migration manifest

This manifest records the content removed from the public `josebenitez.ai`
route tree while `joselo.blog` is being prepared. Redirects are proposals only:
do not enable them until the matching destination is live and verified.

The MDX handoff bundle lives outside this repository at
`work/joselo-blog-migration/`; the paths below are relative to that bundle.

## Confirmed moves

| Current public URL | Source retained at | Proposed destination | Notes |
| --- | --- | --- | --- |
| `/lab` | External handoff bundle: `confirmed/personal-lab.md` | `https://joselo.blog/lab` | Personal experiments, biohacking themes, tools, and medical disclaimer. |
| `/biohacking` | Removed legacy redirect; recoverable from `origin/main:src/app/biohacking/page.tsx` | `https://joselo.blog/lab` | Preserve as a legacy alias after the destination exists. |
| `/blog/do-it-anyway` | External handoff bundle: `confirmed/do-it-anyway.mdx` | `https://joselo.blog/do-it-anyway` | Personal essay on discipline, motivation, and willpower. |
| `/blog/marco-existencial` | External handoff bundle: `confirmed/marco-existencial.mdx` | `https://joselo.blog/marco-existencial` | Personal philosophical and spiritual essay. |
| `/blog/hello-world` | External handoff bundle: `candidates/hello-world.mdx` | `https://joselo.blog/hello-world` | Personal note about rebuilding, learning, and creating in public. |

## Correlations retained on josebenitez.ai

The phrase “correlations” does not exist in the previous code or frontmatter.
For this draft, it is implemented as adjacent forces that shape Physical AI:
compute, energy, infrastructure, and model shifts. This interpretation is
explicit and reversible in the PR.

| Public URL | Source | Why it belongs under Correlations |
| --- | --- | --- |
| `/blog/4o-image-gen` | `content/posts/4o-image-gen.mdx` | Model-architecture shifts and their effect on multimodal systems. |
| `/blog/paraguay-ai-factory` | `content/posts/paraguay-ai-factory.mdx` | The energy, compute, infrastructure, and policy layer around AI systems. |

## Content intentionally retained on josebenitez.ai

| Public URL | Source | Reason |
| --- | --- | --- |
| `/blog/autonomous-retail` | `content/posts/autonomous-retail.mdx` | Direct Physical AI case: perception and autonomy in unattended retail. |
| `/blog/inferentia-chips` | `content/posts/inferentia-chips.mdx` | Direct supporting infrastructure case for production computer-vision inference. |
| `/blog/4o-image-gen` | `content/posts/4o-image-gen.mdx` | Correlations: model and multimodal architecture shifts. |
| `/blog/paraguay-ai-factory` | `content/posts/paraguay-ai-factory.mdx` | Correlations: energy and compute infrastructure. |

## Asset handoff

| Content | Asset dependency | Action |
| --- | --- | --- |
| `hello-world` | External handoff bundle: `assets/hello-world.jpg` | Copied into the `joselo.blog` project. |
| `paraguay-ai-factory` | `public/blog/paraguay-ai-factory.png` | Restored to the professional project with the Correlations post. |
| `4o-image-gen` | Remote images embedded in the MDX | Remains on its existing professional URL; continue monitoring remote availability and attribution. |
| `do-it-anyway` | None | No asset migration required. |
| `marco-existencial` | None | No asset migration required. |
| `lab` / `biohacking` | None in the current route | No asset migration required. |

## Redirect activation checklist

1. Confirm the final `joselo.blog` URL structure.
2. Publish each destination with matching canonical metadata.
3. Verify desktop/mobile rendering and every local or remote image.
4. Set `JOSELO_BLOG_REDIRECTS_ENABLED=true` in Vercel and redeploy. The
   permanent redirects are already implemented behind this disabled-by-default
   switch.
5. Verify each redirect returns the intended final URL before treating the
   migration as complete.
