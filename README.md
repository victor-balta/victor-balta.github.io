# Personal CV

A simple one-page CV built with Vue.js, Tailwind CSS, and DaisyUI.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

## Deployment to GitHub Pages

1.  Update the `base` in `vite.config.js` if you are deploying to a user page or project page with a specific path (current setting `base: './'` works for most cases).
2.  Push your code to GitHub.
3.  Go to your repository settings -> Pages.
4.  Source: "GitHub Actions".
5.  Or, if you want to deploy manually:
    - Run `npm run build`
    - Commit the `dist` folder to a `gh-pages` branch (or configure GitHub Pages to serve from `/docs` if you rename `dist` to `docs`).

### Recommended: GitHub Actions

Create a file `.github/workflows/deploy.yml` with the following content to automatically deploy on push to `main`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```
