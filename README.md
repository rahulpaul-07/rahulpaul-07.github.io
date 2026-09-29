# rahulpaul-07.github.io

Personal portfolio. Next.js (App Router), Tailwind CSS v4 and Motion, exported as a static site and deployed to GitHub Pages.

An editorial layout: IBM Plex Sans and Mono with an Instrument Serif accent, paper and ink in light and dark (system preference, with a toggle), and colour reserved for measured results. Every project figure comes from that project's own README or results files.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in ./out
```

## Editing content

All text lives in `src/data/portfolio.ts`. Components only handle layout.

Static files go in `public/`:

- `public/Rahul_Paul_Resume.pdf`
- `public/assets/og.png` (social preview, 1200x630, in the site's own type and colours)
- `public/assets/*.jpg` (project screenshots referenced in the data file)

## Structure

```
src/
  app/            layout, page, global styles and design tokens
  components/     one file per section; projects.tsx is the filterable, expandable list
  components/ui/  components adapted from Magic UI, plus brand icons
  data/           all site content
  lib/utils.ts    cn() helper and base-path aware asset()
```

## Adding components from 21st.dev

`components.json` is configured for the shadcn CLI, so any component page on 21st.dev can be installed with the command it shows, for example:

```bash
npx shadcn@latest add "https://21st.dev/r/<author>/<component>"
```

It lands in `src/components/ui/`. Recolour it with the tokens in `globals.css` (`paper`, `panel`, `rule`, `ink`, `body`, `muted`, `accent`, `warn`); each is defined for light and dark.

## Credits

The animated beam, number ticker, blur fade and scroll progress components are adapted from [Magic UI](https://magicui.design) (MIT), which is also published on 21st.dev; each file notes what changed. Brand icons are from [Simple Icons](https://simpleicons.org) (CC0).

## Deployment

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. In the repo settings, set Pages > Source to "GitHub Actions".
