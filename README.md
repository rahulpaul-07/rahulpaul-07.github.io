# rahulpaul-07.github.io

Personal portfolio. Next.js (App Router), Tailwind CSS v4 and Motion, exported as a static site and deployed to GitHub Pages.

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
- `public/assets/og.png` (social preview, 1200x630)
- `public/assets/*.jpg` (project screenshots referenced in the data file)

## Structure

```
src/
  app/            layout, page, global styles and design tokens
  components/     one file per section, plus the interactive terminal
  components/ui/  UI components from Magic UI plus brand icons
  data/           all site content
  lib/utils.ts    cn() helper and base-path aware asset()
```

## Adding components from 21st.dev

`components.json` is configured for the shadcn CLI, so any component page on 21st.dev can be installed with the command it shows, for example:

```bash
npx shadcn@latest add "https://21st.dev/r/<author>/<component>"
```

It lands in `src/components/ui/`. Recolour it with the tokens in `globals.css` (`phosphor`, `amber`, `panel`, `line`, `ink`, `muted`).

## Credits

The flickering grid, hyper text, magic card, border beam, dock, scroll progress, animated beam, number ticker, Safari frame and dotted map components are adapted from [Magic UI](https://magicui.design) (MIT), which is also published on 21st.dev. Brand icons are from [Simple Icons](https://simpleicons.org) (CC0).

## Deployment

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. In the repo settings, set Pages > Source to "GitHub Actions".
