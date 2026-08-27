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

GitHub Pages: deploy the repo root. `.nojekyll` is in the tree. `images/` and `fonts/` are restored by the Pages workflow at build time and are not committed, so a local run needs the same fetch. See the workflow for the exact list.

## Paint lock

| Token | Value | Use |
| --- | --- | --- |
| `--ground` | `#FFFFFF` | Page |
| `--type` | `#000000` | Type, cube stroke, CTA label |
| `--slate` | `#475569` | Muted line |
| `--signal` | `#FF6A00` | CTA fill, chip border, step number box, Why rule |
| `--hair` | `rgba(0,0,0,.06)` | Plate hairlines |
| `--edge` | `rgba(0,0,0,.16)` | Input border, ghost CTA border, grabber |

CTA is black on orange. No white on orange. No `#FF2D2D`. The only chromatic value in the sheet is `#FF6A00`. Everything else is white, black, one slate, and black at low alpha.

Type: Space Grotesk (display), Geist (UI), JetBrains Mono (numerals and 11px caps). Self-hosted `woff2` in `/fonts`. No Inter. No fourth face. Radius 0 to 4. No frost.

Mark: 12-edge cube wireframe, path starts `M7 9 L12 6`, stroke `#000`.

H1 on Home is exactly: You Sell. We Ship.

## Cards

Home reads as capability tiles, not alternating rows. Each tile is image first.

| Part | Rule |
| --- | --- |
| Still | Clipped, radius 4, static grain overlay, `scale(1.03)` on hover or focus-within |
| Chip | Outlined 1px `#FF6A00`, transparent at rest, fills only when the tile is active |
| Title | Space Grotesk 700, 24 to 32 |
| Body | Two sentences, `--slate`, 16 |
| CTA | One path per tile, ghost chip to `/quote/`, border goes `#FF6A00` on hover or focus |

Order is fixed: Warehousing, Fulfillment, eCommerce Integrations, Location. Location takes a wide plate at the foot of the grid and carries the truck still. Value-chain chips read Procurement, Fulfillment, Integration, Logistics.

Rest is image-led, but nothing is hidden in hover. Title, body, and CTA are all present at rest, so a keyboard sees exactly what a pointer sees. Tab focus fires the same chip fill that hover does, through `:focus-within`. No `role=tab`. No selected chip. No brightness crush.

Still mapping was corrected in this recut. The racking aisle sits on Warehousing and the pick-bin floor sits on Fulfillment, so each frame shows what its tile claims. Alt text was rewritten from the actual frames.

## Motion

`script.js` carries a critically damped spring solver. Semi-implicit Euler, substepped at 4ms, frame delta clamped at 64ms. Damping 1, so bounce is 0 everywhere. Transform and opacity only. No layout animation.

| Run | Response | Damping | Notes |
| --- | --- | --- | --- |
| Press down | 0.14 | 1 | `scale(0.97)`, fires on pointer-down, not click |
| Press release | 0.36 | 1 | Settles from the live value |
| Sheet enter | 0.36 | 1 | No bounce on enter |
| Sheet exit | 0.34 | 1 | Same track as enter, takes drag velocity |
| Nav settle | 0.40 | 1 | Hides past three header heights on the way down, returns on the way up |

Every run reads its live presentation value before retargeting, so an interrupted animation never snaps and input is never locked. A pointer-down mid-flight takes the sheet over at whatever position it was passing through.

Sheets: Quote and the mobile menu are the same component. Drag from the grabber or from panel dead space when the panel is at scroll top. Above the rest point the travel rubber-bands on the iOS curve, `d * 0.55 * limit / (limit + 0.55 * d)`, so 200px of pull yields about 82px of travel. On release, a flick over 750 px/s or a rest past 32 percent of panel height dismisses, and anything under that settles home with the velocity carried in.

The Quote sheet is progressive enhancement over the real page. Every CTA keeps `href="./quote/"`. With JS off the CTA navigates and the sheet never exists. With JS on, the sheet opens and links out to the full page.

Reveals are plain settle curves, not springs. Stills never spring. Stagger is 80ms.

`prefers-reduced-motion`: travel and scale come off, reveals become a 240ms opacity cross-fade, sheets cross-fade at 200ms on the same enter and exit path, and the 80ms chip dissolve stays.

`prefers-reduced-transparency`: the scrim goes solid `#FFFFFF` and the panel takes a hard edge.

## How it works

Measured sit of [joinsubstrate.com/#sellers-how-it-works](https://www.joinsubstrate.com/#sellers-how-it-works) at 1440w, recut onto Shipfront verbs.

| Token | Substrate (left there) | THE SHEET |
| --- | --- | --- |
| Body / section | `#FFFFFF`, no section fill | same, inherit white |
| Ink | `#212831` | `#000000` |
| Muted eyebrow | `#212831` at 40% | `#475569` |
| Accent | none | `#FF6A00` on CTA fill, rules, number-box hairline |
| CTA | white chip, radius 4, pad 12 | `#000000` on `#FF6A00`, radius 4 |
| Step | not a card: radius 0, border 0, shadow none, padding 0 | same |
| Container | 860px centered, band pad 64px 0 | same, plus a plate hairline above the band |
| Columns | three at 287px, 0 gutter | Inbound, Floor, Ship. Box stays 287 at 0 gutter, step text takes 28px of right padding so the columns do not touch |
| Type | 14 / 32, h2 lh 1.1 tracking -0.02em, body 14 / 1.4 | same, Space Grotesk (their Rhymes serif left) |
| Numbers | baked PNG chips + diagonal hatch | real DOM, 1px signal box, JetBrains 1 2 3. No hatch |
| Nav | `position: relative` | `position: sticky`, settles on scroll. Deviation, taken on purpose |
| Reveal | fade-up, ~80ms stagger per column | same. No hover transform on steps |
| Hero wash | `#56ACF7` to `#AF9160` | left there. No sky-to-amber on Shipfront |
| H2 dash | their H2 uses an em dash | ours does not |

H2: From inbound to the customer.

## Why Shipfront

`#why` heading, signal rule, capability tiles, static `ul.chips`, one quote path per tile. Nav Why link scrolls to `#why`. No `role=tab`. No selected chip.

## Form

Quote, Contact, and the Quote sheet require Name, Email, Company. No phone. No SKUs. No what-you-ship field. Each form states No phone in its note line.

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
| `#FF6A00` on `#FFFFFF` | 2.87:1 | measured, border and rule only, never small type |

Band sit remeasured on THE SHEET at viewport 1440x900 (Playwright, 2026-08-27):

| Token | Target | Measured |
| --- | --- | --- |
| `.floor-inner` width | 860 | 860 |
| `.floor` pad | 64 0 | 64 / 64 |
| `.step` width | 287, gutter 0 | 287 / 287 / 287 |
| `.floor h2` | 32 / 1.1 / -0.02em | 32px / 35.2px / -0.64px |
| body ground / ink | `#FFFFFF` / `#000000` | `rgb(255,255,255)` / `rgb(0,0,0)` |
| CTA | radius 4, `#000` on `#FF6A00` | 4px / `rgb(0,0,0)` on `rgb(255,106,0)` |
| chip border | `#FF6A00` | `rgb(255,106,0)` |
| chip on hover and on Tab focus | fills `#FF6A00` | `rgb(255,106,0)` both paths |
| H1 face and string | Space Grotesk, You Sell. We Ship. | `"Space Grotesk", sans-serif`, exact string |
| `role=tab` count | 0 | 0 |
| Sheet rubber band, 200px pull | resisted | 82.2px of travel |
| Flick dismiss | flick down closes | closed, `hidden` restored, focus returned to the trigger |
| Slow 20px drag | settles home | back to 0 |
| Console and request errors | none | none across Home, Quote, Contact, mobile, reduced motion |

fps: assumed, not measured. Spring response values are authored, not sat from a recording. Still grain is a static SVG overlay. Tile still `scale(1.03)` on hover is assumed.

`logistics-usa.jpg` lock: sha1 `01268520751d59bf9762d2d7d7c3e1555ba60c8d`, 376501 bytes, verified in the Pages workflow on every deploy and re-verified locally on 2026-08-27.

## Data-source credits

Stills were copied as exact bytes from the public GitHub Pages lives. Not generated. Not vision-recut.

| File | Source | Notes |
| --- | --- | --- |
| `images/logistics-usa.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/logistics-usa.jpg | USA long-hood freight lock. Same bytes on THE CORNER live. Location tile |
| `images/procurement.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/procurement.jpg | Pick-bin floor. Fulfillment tile |
| `images/fulfillment.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/fulfillment.jpg | Racking aisle. Warehousing tile |
| `images/integration.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/integration.jpg | Trailers in an ordered grid from above. eCommerce Integrations tile |

File names carry the value chain. Tile assignment follows the frame, not the file name.

Fonts were downloaded once at authoring time from jsDelivr Fontsource (`space-grotesk`, `geist`, `jetbrains-mono`) and are refetched by the workflow. Runtime does not call a font CDN.

Space Grotesk: OFL. Geist: OFL (Vercel). JetBrains Mono: OFL.

Product copy is recut from [myshipfront.com](https://www.myshipfront.com/). Chrome structure was sat with at [joinsubstrate.com](https://www.joinsubstrate.com/#sellers-how-it-works). Card scale and choreography were sat with at [venice.ai](https://venice.ai/). Substrate name, mark, financing copy, Cal.com, serif, and product UI screenshots were left there. Venice oat, Canela, serif, water hero, sign in, request access, pricing tiers, model carousel, and chat mock were left there.

This repo does not push to `davidtphung/shipfront-the-crate`, `davidtphung/shipfront-the-corner`, `davidtphung/shipfront-the-press`, or `davidtphung/shipfront-the-orange`.

## Address

Shipfront  
1933 S. Broadway  
Los Angeles CA 90007  
info@myshipfront.com
