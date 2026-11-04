# BareVial

Research-grade peptides. Bare pricing.

Static storefront — no build step. Deployed via GitHub Pages.

## Structure
- `index.html` — landing, catalog, stacks, club, FAQ
- `styles.css` — design system
- `app.js` — product data, cart (localStorage), COA modals
- `assets/logo.svg` — brand mark / favicon

## Run locally
Open `index.html`, or `python3 -m http.server`.

## Store model
White-label dropship, RUO labelling. Checkout is cart-ready; wire Stripe or a high-risk gateway to take payment.

## Notes
- All prices/COA data are editable in the `PRODUCTS` / `STACKS` arrays in `app.js`.
- All copy is Research Use Only compliant.
