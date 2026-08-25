# THE SHEET

Shipfront marketing site. White Substrate-style chrome. Orange accent `#FF6A00`. Three pages. Static HTML, CSS, and one small JS file.

Built by David T Phung

## Run alone

From the repo root:

```bash
python3 -m http.server 47261
```

Open [http://127.0.0.1:47261/](http://127.0.0.1:47261/).

Or open `index.html` in a browser. Paths are relative, so Home, Quote, and Contact resolve without a build.

| Page | Path |
| --- | --- |
| Home | `/` (`index.html`) |
| Quote | `/quote/` |
| Contact | `/contact/` |

GitHub Pages: deploy the repo root. `.nojekyll` is in the tree.

## Paint lock

| Token | Value | Use |
| --- | --- | --- |
| `--ground` | `#FFFFFF` | Page |
| `--type` | `#000000` | Type, cube stroke, CTA label |
| `--slate` | `#475569` | Muted line |
| `--signal` | `#FF6A00` | CTA fill, How it works hairline, Why rule |

CTA is black on orange. No white on orange. No `#FF2D2D`.

Type: Space Grotesk (display), Geist (UI), JetBrains Mono (numerals). Self-hosted `woff2` in `/fonts`. No Inter. No fourth face. Radius 0 to 4. No frost.

Mark: 12-edge cube wireframe, path starts `M7 9 L12 6`, stroke `#000`.

H1 on Home is exactly: You Sell. We Ship.

## How it works

Measured sit of [joinsubstrate.com/#sellers-how-it-works](https://www.joinsubstrate.com/#sellers-how-it-works) at 1440w, recut onto Shipfront verbs.

| Token | Substrate (left there) | THE SHEET |
| --- | --- | --- |
| Body / section | `#FFFFFF`, no section fill | same, inherit white |
| Ink | `#212831` | `#000000` |
| Muted eyebrow | `#212831` at 40% | `#475569` |
| Accent | none | `#FF6A00` on CTA fill, rules, number-box hairline |
| CTA | white chip, radius 4, pad 12 | `#000000` on `#FF6A00`, radius 4, pad 12 |
| Step | not a card: radius 0, border 0, shadow none, padding 0 | same |
| Container | 860px centered, band pad 64px 0 | same |
| Columns | three at 287px, 0 gutter | Inbound, Floor, Ship |
| Type | 14 / 32, h2 lh 1.1 tracking -0.02em, body 14 / 1.4 | same, Space Grotesk (their Rhymes serif left) |
| Numbers | baked PNG chips + diagonal hatch | real DOM, 1px signal box, JetBrains 1 2 3. No hatch |
| Nav | `position: relative` | same. Not sticky |
| Reveal | fade-up, ~80ms stagger per column | same. No hover transform on steps |
| Hero wash | `#56ACF7` to `#AF9160` | left there. No sky-to-amber on Shipfront |
| H2 dash | their H2 uses an em dash | ours does not |

H2: From inbound to the customer.

## Why Shipfront

`#why` heading, signal rule, alternating image and copy rows, static `ul.chips`, CTA to `/quote/`. Nav Why link scrolls to `#why`. No `role=tab`. No selected chip.

## Form

Quote and Contact require Name, Email, Company. No phone. No SKUs. No what-you-ship field.

Success copy:

Thanks. Someone from Shipfront will reach out shortly. We'll ask about volume and what you ship then.

The form does not POST. `script.js` validates in the browser and shows the status. Named network actions: none on load. `mailto:info@myshipfront.com` is user-initiated. No analytics SDK.

## Measured vs assumed

Contrast, WCAG 2 relative luminance, Python, 2026-08-25:

| Pair | Ratio | Notes |
| --- | --- | --- |
| `#000000` on `#FFFFFF` | 21.00:1 | measured |
| `#000000` on `#FF6A00` | 7.31:1 | measured, CTA label |
| `#475569` on `#FFFFFF` | 7.58:1 | measured, muted body |
| `#FF6A00` on `#FFFFFF` | 2.87:1 | measured, not used as small type |

Band sit remeasured on THE SHEET at viewport 1440x900 (Playwright, 2026-08-25):

| Token | Target | Measured |
| --- | --- | --- |
| `.floor-inner` width | 860 | 860 |
| `.floor` pad | 64 0 | 64 / 64 |
| `.step` width | 287, gutter 0 | 287 / 287 / 287 |
| `.floor h2` | 32 / 1.1 / -0.02em | 32px / 35.2px / -0.64px |
| `.step p` | 14 / 1.4 | 14px / 19.6px |
| eyebrow | `#475569` | `rgb(71, 85, 105)` |
| nav | `relative` | `relative` |
| CTA | pad 12, radius 4, `#000` on `#FF6A00` | 12 / 4 / `rgb(0,0,0)` on `rgb(255,106,0)` |
| step chrome | radius 0, border 0, shadow none, pad 0 | all match |

fps: assumed, not measured. No `requestAnimationFrame` loop. Step fade-up duration 240ms is assumed. Stagger 80ms is from the sit. Translate 12px is assumed. Number box 28px is assumed. Still grain is a static SVG overlay.

`logistics-usa.jpg` lock: sha1 `01268520751d59bf9762d2d7d7c3e1555ba60c8d`, 376501 bytes, measured after copy.

## Data-source credits

Stills were copied as exact bytes from the public GitHub Pages lives. Not generated. Not vision-recut.

| File | Source | Notes |
| --- | --- | --- |
| `images/logistics-usa.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/logistics-usa.jpg | USA long-hood freight lock. Same bytes on THE CORNER live. |
| `images/procurement.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/procurement.jpg | Inbound rack still |
| `images/fulfillment.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/fulfillment.jpg | Pick floor still |
| `images/integration.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/integration.jpg | Aisle still |

Fonts were downloaded once at authoring time from jsDelivr Fontsource (`space-grotesk`, `geist`, `jetbrains-mono`) and committed. Runtime does not call a font CDN.

Space Grotesk: OFL. Geist: OFL (Vercel). JetBrains Mono: OFL.

Product copy is recut from [myshipfront.com](https://www.myshipfront.com/). Chrome structure was sat with at [joinsubstrate.com](https://www.joinsubstrate.com/#sellers-how-it-works). Substrate name, mark, financing copy, Cal.com, serif, and product UI screenshots were left there.

This repo does not push to `davidtphung/shipfront-the-crate` or `davidtphung/shipfront-the-corner`.

## Address

Shipfront  
1933 S. Broadway  
Los Angeles CA 90007  
info@myshipfront.com
