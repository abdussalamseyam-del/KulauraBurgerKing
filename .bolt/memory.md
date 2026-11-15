# Project memory

## Product intent & audience

- Ultra-premium dark-luxury burger restaurant website with 3D scroll storytelling.
- Audience: diners in Sylhet, Bangladesh seeking a high-end burger ordering experience.
- Core flows: explore menu → build custom burger → add to cart → checkout → order via WhatsApp or delivery form.

## Brand personality & voice

- Premium, cinematic, confident; "luxury burger" positioning, not casual fast-food.
- Tone is polished and minimal — short evocative copy, no slang or emojis in body text.
- Currency always Taka (৳ / TK); locale is Bangladeshi.

## Visual design & UX direction

- Dark luxury palette: near-black backgrounds, gold accent highlights/glows, high-contrast white text.
- 3D burger built from stacked CSS layers, animated layer-by-layer on scroll and on ingredient selection.
- GSAP + ScrollTrigger for scroll-in section reveals and parallax; side-dot navigation syncs with sections.
- Typography: large display headings, generous spacing, uppercase section labels.
- Cards (offers, reviews, menu, delivery stats) use dark surfaces with gold hover glow and subtle 3D tilt/float.
- Fully mobile responsive — nav collapses, 3D burger scales down, grids reflow to single column.
- Floating WhatsApp button bottom-right, pulsing green, expands to order panel pre-filled from cart contents.
- Prefer lucide-react icons only; no extra UI/icon packages.

## Decisions, constraints & rationale

- Stack: Vite + React (JSX) + Tailwind CSS + lucide-react; GSAP for animation.
- Path alias `@/` → `src/` used for all imports (no deep relative paths).
- Centralized data file for menu items, builder ingredients, offers, reviews, delivery zones — keeps components clean and editable.
- Build Your Own Burger: bun / patty / toppings / sauces selectors drive a live 3D stack and real-time Taka price; custom burger addable to cart.
- Cart state shared across Menu, Builder, Cart, Checkout, and WhatsApp button.
- Checkout captures Name, Phone, Address + delivery info; WhatsApp message auto-formats cart items and total.
- Delivery zones reference Sylhet areas with fees and ETA; free delivery threshold 500 TK; avg 25 min; hours 11AM–11PM.
- Offers: coupon codes copy-to-clipboard (B1G1 Tuesday, 20% off over 1000 TK, free delivery over 500 TK).
- Reviews: 6 testimonials + overall 4.9/5 rating.
- Build must pass `tsc` and `vite build` cleanly with no type errors.

## Open questions & assumptions

- No backend/persistence assumed; cart and orders are client-side only unless later requested.
- WhatsApp number assumed/placeholder — needs confirmation for production.
- Delivery zones, fees, and ETAs are illustrative for Sylhet; confirm real coverage and pricing.
- Offers are display + coupon copy only; no automatic discount logic applied in cart yet.
- Payment method (cash on delivery vs. online) not yet specified.