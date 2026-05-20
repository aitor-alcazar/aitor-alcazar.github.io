# aitor-alcazar.github.io

Personal website built with Jekyll and deployable on GitHub Pages.

## Run locally

```bash
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000`.

## Deploy as GitHub Pages

1. Push this repository to GitHub as `aitor-alcazar/aitor-alcazar.github.io`.
2. In **Settings → Pages**, set **Build and deployment** to **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`.
4. Your site will be published at: `https://aitor-alcazar.github.io`.

## Data-driven sections

- In progress cards: `_data/cards.yml`
- Writing entries: `_data/writing.yml`
- Talks entries: `_data/talks.yml`

## Structure

- Layouts in `_layouts/`
- Reusable partials in `_includes/`
- Homepage data sources in `_data/`
- Card detail pages in `cards/`
- Static assets in `assets/`
