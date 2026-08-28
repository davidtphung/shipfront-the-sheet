# THE SHEET

Shipfront marketing site. Friday Terminal lock on the live 3-pager. White ground, black type, Kunal cube, one accent. Static HTML, CSS, and one small JS file.

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

Black, white, cube, one accent. Copy stays [myshipfront.com](https://www.myshipfront.com/) live copy. No invented product facts.

| Token | Value | Use |
| --- | --- | --- |
| `--ground` | `#FFFFFF` | Page |
| `--type` | `#000000` | Type, cube fill and stroke, ink buttons |
| `--slate` | `#475569` | Muted line |
| `--signal` | `#FF6A00` | Wordmark bar, Get a Quote fill, cube stroke |
| `--hair` | `rgba(0,0,0,.06)` | Plate hairlines |
| `--edge` | `rgba(0,0,0,.16)` | Input border, grabber |

Orange `#FF6A00` is the one accent: wordmark bar, Get a Quote fill, and cube stroke. CTA label is `#000` on the accent. No white on orange. No `#FF2D2D`. Ground stays `#FFFFFF`. Chips, rules, skip link, and form chrome stay black and white.

Type: Space Grotesk (display), Geist (UI), JetBrains Mono (numerals and 11px caps). Self-hosted `woff2` in `/fonts`. No Inter. No fourth face. Radius 0 to 4. No frost. No cartoons. No em dashes.

## Mark

Kunal hex + inner Y, stem down. ViewBox `0 0 24 26`. Fill `#000`. Stroke `#FF6A00`. Square caps, miter. Hex `M12 6 L17 9 L17 16 L12 19 L7 16 L7 9 Z`. Y arms `M7 9 L12 12 L17 9`. Stem down `M12 12 L12 19`. Not a pip. Not `32x36`. Not `M16 3.2`. Not viewBox `80 80`.

Wordmark bar: `SHIPFRONT` on `#FF6A00`, label `#000`.

H1 on Home is exactly: You Sell. We Ship.

## Cards

Home reads as capability tiles. Each tile is image first. Stills are not generated and not replaced.

Value props stay Warehousing, Fulfillment, eCommerce Integrations, Location. Location names The Reef as an address: 1933 S. Broadway, Los Angeles CA 90007.

## Form

Quote, Contact, and the Quote sheet require Name, Email, Company. No phone. No SKUs. No what-you-ship field.

The form does not POST. `script.js` validates in the browser and shows the status. Named network actions: none on load. `mailto:info@myshipfront.com` is user-initiated. No analytics SDK.

## Footer

Exact line: Built by David T Phung

## Address

Shipfront  
The Reef  
1933 S. Broadway  
Los Angeles CA 90007  
info@myshipfront.com

No phone. No SLAs. No FDA. No WMS. No temp.

## Motion

`script.js` carries a critically damped spring solver. Semi-implicit Euler, substepped at 4ms, frame delta clamped at 64ms. Damping 1, so bounce is 0 everywhere. Transform and opacity only. No layout animation.

The Quote sheet is progressive enhancement over the real page. Every Get a Quote CTA keeps `href` to `/quote/`. With JS off the CTA navigates and the sheet never exists.

`prefers-reduced-motion`: travel and scale come off, reveals become a 240ms opacity cross-fade.

## Data-source credits

Stills were copied as exact bytes from the public GitHub Pages lives. Not generated. Not vision-recut.

| File | Source | Notes |
| --- | --- | --- |
| `images/logistics-usa.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/logistics-usa.jpg | Location tile |
| `images/procurement.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/procurement.jpg | Fulfillment tile |
| `images/fulfillment.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/fulfillment.jpg | Warehousing tile |
| `images/integration.jpg` | https://davidtphung.github.io/shipfront-the-crate/images/integration.jpg | eCommerce Integrations tile |

File names carry the value chain. Tile assignment follows the frame, not the file name.

Product copy is recut from [myshipfront.com](https://www.myshipfront.com/). Forbidden live claims (phone, SLAs, FDA, WMS, temp) are left off.

This repo does not push to `davidtphung/shipfront-the-crate`, `davidtphung/shipfront-the-corner`, `davidtphung/shipfront-the-press`, or `davidtphung/shipfront-the-orange`.
