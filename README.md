# NorthBricks AB

English marketing site for NorthBricks AB. Flagship product: digital bank transfers. Other apps: Tojo Chat (tojo.chat), Takt (takta.app), and Planbuster (planbuster.com).

## Open locally

Open `index.html` in a browser, or from this folder run:

```bash
python3 -m http.server 4173
```

Then visit [http://localhost:4173](http://localhost:4173).

## Pages

- `index.html` — home
- `product.html` — bank transfers product
- `software.html` — other apps and software
- `about.html` — company
- `contact.html` — contact form (client-side only; submit opens the visitor's email app with a prefilled `mailto:`)

## Assets

- `favicon.svg`, `apple-touch-icon.png` — site icons
- `og-image.png` — 1200x630 share image used by the Open Graph / Twitter tags in every page `<head>`

Canonical and `og:url` tags assume the production domain `https://northbricks.se/`. Update them if the site is served elsewhere.

There is no backend and no live payments.
