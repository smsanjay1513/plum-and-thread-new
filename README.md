# Plum & Thread — Tiruppur Apparel Manufacturing & Bulk GST Quotation

A responsive, single-page **B2B apparel manufacturing website** with an interactive **GST quotation calculator**, built for **Plum & Thread**, a (fictional) vertically integrated knitwear and outerwear manufacturer based in **Tiruppur, Tamil Nadu, India**.

Buyers can browse the product catalog, build a bulk quote with exact GST slab calculations, copy or print the quote, and send a proforma-invoice / sample request.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Available Scripts](#available-scripts)
6. [Catalog & GST Specification](#catalog--gst-specification)
7. [How the Quotation Engine Works](#how-the-quotation-engine-works)
8. [Page Sections](#page-sections)
9. [Design System](#design-system)
10. [Accessibility & Responsiveness](#accessibility--responsiveness)
11. [Configuration & Environment](#configuration--environment)
12. [Known Notes & Future Improvements](#known-notes--future-improvements)
13. [AI Usage Disclosure](#ai-usage-disclosure)

---

## Features

### Product catalog
- 8 garment SKUs across 4 categories: **Tops & Fleece, Bottoms, Outerwear & Headwear, Kidswear**
- Category filter tabs
- Each card shows SKU, fabric spec, GSM, lead time, HSN code, GST rate and unit price
- One-click **Add to quote** with inline `−` / `+` quantity steppers once an item is added
- Image fallback if a photo fails to load

### GST quotation calculator
- **Clean initial state** — the quote starts empty; the user adds only what they need
- **Quick-add selector** (product dropdown + quantity) or add directly from catalog cards
- **Add / update / remove** line items, with stepper buttons or direct numeric input
- **Anti-negative guard** — blocks the `-`, `+`, `e`, `E` and `.` keys and clamps quantities to whole numbers `>= 1`
- **Reset Quantities** (all lines back to 1) and **Clear Quotation** (back to empty state)
- **Exact GST breakdown**: per-line subtotal, per-line GST, slab-wise summary (5% / 12% / 18%), total GST and grand total
- **Copy Summary** — copies a formatted text quote to the clipboard (with a `document.execCommand` fallback)
- **Print / Save as PDF** — opens a printable quote preview modal and triggers the browser print dialog, with dedicated `@media print` styles
- Desktop ledger table paired with mobile-friendly line-item cards

### Other site features
- **Light / Dark theme** toggle (Hero and Footer), persisted in `localStorage` and applied before first paint to avoid a flash
- **Sticky navbar** with a live quote item count badge and a mobile menu
- **Inquiry / proforma request form** with client-side validation and a generated reference number (e.g. `PT-2026-4821`); the current quote can optionally be attached
- **FAQ accordion**, testimonials, manufacturing-process timeline and "Why choose us" sections
- Smooth scrolling between sections, with `prefers-reduced-motion` support

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| UI library | **React 19** |
| Language | **TypeScript** (strict-style typed models for products, line items and summaries) |
| Build tool / dev server | **Vite** with `@vitejs/plugin-react` |
| Styling | **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (`@theme` tokens, `@custom-variant dark`) |
| Icons | **lucide-react** |
| Fonts | **Google Fonts** — Bricolage Grotesque (display), Plus Jakarta Sans (body), JetBrains Mono (numbers) |
| Number / currency formatting | Browser-native **`Intl.NumberFormat('en-IN')`** (INR, Indian digit grouping) |
| State management | React hooks only (`useState`, `useMemo`, `useEffect`) — state lives in `App.tsx` |
| Persistence | `localStorage` (theme preference only) |
| Type checking | `tsc --noEmit` (the `lint` script) |
| Image assets | AI-generated JPG product and hero photography |

**Scaffold-level dependencies:** `package.json` also lists `@google/genai`, `express`, `dotenv`, `motion`, `tsx`, `esbuild` and `autoprefixer`. These come from the Google AI Studio project template and are **not imported by the current source code** — the app is a pure front-end SPA with no backend and no AI API calls at runtime. They can be removed to slim down the install.

---

## Project Structure

```
plum-and-thread-new-main/
├── index.html                 # HTML shell, SEO/Open Graph meta, font links, early dark-mode script
├── package.json               # Scripts and dependencies
├── vite.config.ts             # React + Tailwind plugins, "@" alias, copies src/assets into dist/
├── tsconfig.json              # TypeScript config (ES2022, bundler resolution, react-jsx)
├── metadata.json              # AI Studio applet metadata
├── .env.example               # Template for environment variables
├── .gitignore
└── src/
    ├── main.tsx               # React entry point
    ├── App.tsx                # Root component: quote state, theme state, handlers
    ├── index.css              # Tailwind import, theme tokens, print + reduced-motion rules
    ├── data/
    │   └── catalog.ts         # Typed products, categories, KPIs, process steps,
    │                          #   advantages, testimonials, FAQs, hero image
    ├── utils/
    │   └── quotation.ts       # Pure calculation engine, INR formatters,
    │                          #   quantity sanitizer, CSV + text serializers
    ├── components/
    │   ├── Navbar.tsx             # Sticky header, logo, quote badge, mobile menu
    │   ├── HeroSection.tsx        # Headline, CTAs, KPI stats, theme toggle
    │   ├── ProductCatalog.tsx     # Category filter + product cards
    │   ├── QuotationCalculator.tsx# Quote builder, GST summary, copy/print
    │   ├── ManufacturingProcess.tsx # 5-step production timeline
    │   ├── WhyChooseUs.tsx        # Key advantages
    │   ├── TestimonialsSection.tsx
    │   ├── FaqSection.tsx         # Accordion with aria-expanded
    │   └── ContactFooter.tsx      # Proforma/sample request form + footer
    └── assets/images/         # 1 hero image + 8 product photos
```

---

## Getting Started

### Prerequisites
- **Node.js 20+** and **npm 10+**

### Install and run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The app runs at **http://localhost:3000** (the dev script binds to `0.0.0.0`, so it is also reachable on your LAN).

### Production build

```bash
npm run lint      # type-check with TypeScript
npm run build     # outputs to /dist
npm run preview   # serve the production build locally
```

---

## Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `vite --port=3000 --host=0.0.0.0` | Start the dev server |
| `npm run build` | `vite build` | Create the production bundle in `dist/` |
| `npm run preview` | `vite preview` | Preview the production build |
| `npm run lint` | `tsc --noEmit` | Type-check the project |
| `npm run clean` | `rm -rf dist server.js` | Remove build output |

---

## Catalog & GST Specification

All prices are per unit in INR, exclusive of GST.

| SKU | Product | Category | Fabric | GSM | Unit Price | GST | HSN | Lead Time |
| :--- | :--- | :--- | :--- | :--- | ---: | ---: | :---: | :--- |
| `PT-RNT-180` | Round-neck T-shirt | Tops & Fleece | 100% combed ring-spun cotton | 220 | ₹165 | 5% | 6109 | 12–15 days |
| `PT-POL-240` | Polo T-shirt | Tops & Fleece | Combed cotton matty pique | 240 | ₹235 | 5% | 6105 | 14–18 days |
| `PT-HDY-380` | Hoodie | Tops & Fleece | 80/20 cotton-poly brushed fleece | 380 | ₹480 | 5% | 6110 | 18–21 days |
| `PT-TRK-280` | Track pant | Bottoms | Loopback French terry | 280 | ₹320 | 5% | 6103 | 15–18 days |
| `PT-JKT-320` | Padded jacket | Outerwear & Headwear | Water-repellent matte nylon + polyfill | 320 fill | ₹2,850 | 18% | 6201 | 22–28 days |
| `PT-CAP-260` | Logo cap | Outerwear & Headwear | Heavy brushed cotton twill | 260 | ₹95 | 12% | 6505 | 10–12 days |
| `PT-KDR-200` | Kids romper | Kidswear | 100% organic interlock cotton | 200 | ₹140 | 5% | 6111 | 14–16 days |
| `PT-SHT-250` | Shorts | Bottoms | Combed cotton French terry | 250 | ₹150 | 5% | 6104 | 12–15 days |

> The product names, prices, GSTIN and company statistics in this project are **sample/demo data**. Verify GST slabs and HSN codes against current government notifications before using them commercially.

---

## How the Quotation Engine Works

All business logic lives in [`src/utils/quotation.ts`](src/utils/quotation.ts) as pure functions, separate from the UI.

1. **`sanitizeQuantity(value)`** — returns `1` for `NaN` / `Infinity`, floors decimals, and enforces a minimum of `1`.
2. **`calculateQuotation(items, catalog)`** — for each line item:
   - `subtotal = unitPrice × quantity`
   - `gstAmount = subtotal × gstRate / 100`
   - `lineTotal = subtotal + gstAmount`
   - values are rounded to 2 decimals at each step

   It then aggregates totals and builds a **slab-wise breakdown** (taxable value, GST amount and item count for each of 5%, 12% and 18%), sorted by rate.
3. **`formatINR` / `formatINRWholeOrDecimal`** — Indian-locale currency formatting (e.g. `₹1,23,456.00`).
4. **`formatQuotationSummaryText(summary)`** — builds the plain-text quote used by *Copy Summary*.
5. **`exportQuotationToCsv(summary)`** — serializes a quote to CSV (SKU, name, HSN, qty, unit price, subtotal, GST rate/amount, line total, plus totals).

**State flow:** `App.tsx` holds `quotationItems: { productId, quantity }[]`. A `useMemo` derives the `QuotationSummary`, which is passed down to the Navbar (item count), the Calculator (full breakdown) and the Contact form (attach-quote option).

---

## Page Sections

| # | Section | Anchor ID |
| :-: | :--- | :--- |
| – | Hero + KPI stats (4.2M+ garments, 99.1% on-time dispatch, 180+ brand partners, 100% ZLD dyeing) | `#top` |
| 01 | Product catalog | `#catalog` |
| 02 | Quotation calculator | `#quotation` |
| 03 | Manufacturing process (yarn → knitting → dyeing → cutting → stitching → AQL 2.5 QC & dispatch) | `#process` |
| 04 | Why choose us | `#why-us` |
| 05 | Testimonials | `#testimonials` |
| 06 | FAQ (MOQ, GST, branding, sampling, fabric testing, shipping) | `#faq` |
| 07 | Request samples / proforma invoice + footer | `#contact` |

---

## Design System

- **Colour (60-30-10 rule):** neutral studio surfaces (`#F8F8FA`, `#FFFFFF`), deep charcoal ink (`#141418`) and one textile-inspired **mulberry plum accent (`#5B2348`)**. Dark mode uses near-black surfaces (`#0D0D11`) with lighter plum tints.
- **Typography:** `Bricolage Grotesque` for headings, `Plus Jakarta Sans` for body text, `JetBrains Mono` with `tabular-nums` for prices, quantities and GST figures so digits align.
- **Tokens:** defined in `src/index.css` using Tailwind v4's `@theme` block (`--color-plum`, `--font-display`, etc.).
- **Imagery:** uniform 4:3 studio-style product photos with consistent lighting, plus a hero image of a sunlit mill floor.
- **Motion:** subtle hover/transition effects, disabled via `prefers-reduced-motion`.

---

## Accessibility & Responsiveness

- Semantic landmarks: `<header>`, `<main>`, `<section>`, `<footer>`
- FAQ accordion uses `aria-expanded`
- Visible keyboard focus rings (`focus-visible`)
- Decorative icons marked `aria-hidden`; descriptive `alt` text on every product image
- Form fields with labels, inline validation errors and `noValidate` handling
- Mobile-first layout: desktop ledger table becomes stacked line-item cards on small screens
- Print stylesheet hides header/footer and prints only the quote sheet

---

## Configuration & Environment

Copy `.env.example` to `.env` if you need environment variables:

| Variable | Description |
| :--- | :--- |
| `GEMINI_API_KEY` | Gemini API key (injected automatically in Google AI Studio). **Not used by the current code.** |
| `APP_URL` | URL where the app is hosted (injected by AI Studio / Cloud Run). **Not used by the current code.** |

`vite.config.ts` also includes:
- an `@` path alias pointing at the project root
- a small build plugin that copies `src/assets` into `dist/src/assets`, so root-relative image URLs such as `/src/assets/images/...` still resolve in production
- HMR toggled by the `DISABLE_HMR` environment variable (an AI Studio setting)

---

## Known Notes & Future Improvements

- **The inquiry form is front-end only.** It validates input and shows a reference number, but nothing is sent to a server. Connect it to an email service, CRM or API (e.g. an Express route or a form backend) to receive real requests.
- **CSV export:** `exportQuotationToCsv` is implemented in the utilities but is not yet wired to a button in the UI. Adding a "Download CSV" button would complete it.
- **`DEFAULT_QUOTATION_ITEMS`** in `quotation.ts` is defined but unused (the quote intentionally starts empty).
- Unused scaffold dependencies (`@google/genai`, `express`, `dotenv`, `motion`) can be removed.
- Image paths are root-relative strings in `catalog.ts`; importing them through Vite would enable hashing and optimization.
- Ideas: persist the quote in `localStorage`, add MOQ validation, support custom branding options per line, add automated tests for `quotation.ts`, and add real multi-page routing if the site grows.

---

## AI Usage Disclosure

- **Code & architecture:** built with AI-assisted software engineering (component scaffolding, Tailwind CSS v4 styling, TypeScript types and the quotation calculation logic). Pricing, GST slabs and behaviours were checked against the assessment specification.
- **Visual assets:** the hero image and the eight product photographs were generated with AI image generation (`src/assets/images/`) to avoid brittle external stock links and keep one consistent studio look.

---

## License

Private project — add your preferred license here. stock links and maintain a unified cool travertine studio aesthetic across all eight SKUs.
