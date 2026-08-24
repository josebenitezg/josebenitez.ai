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

## Scope decisions still required

These posts are no longer in the public `content/posts` tree so that the
preview remains strictly focused on Physical AI. Their final destination needs
an editorial decision before redirects are enabled.

| Previous public URL | Source retained at | Proposed destination | Decision boundary |
| --- | --- | --- | --- |
| `/blog/4o-image-gen` | External handoff bundle: `candidates/4o-image-gen.mdx` | `https://joselo.blog/4o-image-gen` | General AI/image-generation analysis; technical, but not Physical AI. |
| `/blog/hello-world` | External handoff bundle: `candidates/hello-world.mdx` | `https://joselo.blog/hello-world` | Mixes general AI observations with a personal note about rebuilding and learning in public. |
| `/blog/paraguay-ai-factory` | External handoff bundle: `candidates/paraguay-ai-factory.mdx` | `https://joselo.blog/paraguay-ai-factory` | AI infrastructure and public-policy analysis; adjacent to the professional focus, but not a Physical AI system case. |

## Content intentionally retained on josebenitez.ai

| Public URL | Source | Reason |
| --- | --- | --- |
| `/blog/autonomous-retail` | `content/posts/autonomous-retail.mdx` | Direct Physical AI case: perception and autonomy in unattended retail. |
| `/blog/inferentia-chips` | `content/posts/inferentia-chips.mdx` | Direct supporting infrastructure case for production computer-vision inference. |

## Asset handoff

| Content | Asset dependency | Action |
| --- | --- | --- |
| `hello-world` | External handoff bundle: `assets/hello-world.jpg` | Copy into the new project if the post moves. |
| `paraguay-ai-factory` | External handoff bundle: `assets/paraguay-ai-factory.png` | Copy into the new project if the post moves. |
| `4o-image-gen` | Remote images embedded in the MDX | Review remote availability and image rights before publishing on the new domain. |
| `do-it-anyway` | None | No asset migration required. |
| `marco-existencial` | None | No asset migration required. |
| `lab` / `biohacking` | None in the current route | No asset migration required. |

## Redirect activation checklist

1. Confirm the final `joselo.blog` URL structure.
2. Publish each destination with matching canonical metadata.
3. Verify desktop/mobile rendering and every local or remote image.
4. Add permanent redirects from the legacy paths in one reversible change.
5. Verify the redirects return the intended final URL before deploying
   `josebenitez.ai`.
