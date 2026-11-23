# Plum & Thread — Tiruppur Apparel Manufacturing & Bulk GST Quotation

A responsive, production-grade B2B apparel manufacturing website and interactive GST quotation calculator built for **Plum & Thread**, a vertically integrated knitwear and outerwear manufacturer in **Tiruppur, Tamil Nadu, India**.

---

## Setup Instructions

### Prerequisites
- Node.js 20+ and npm 10+
- MongoDB connection URI (`MONGODB_URI`) configured in `.env` or environment secrets

### Environment Variables
Copy `.env.example` to `.env` and configure:
- `MONGODB_URI`: MongoDB Atlas or local MongoDB connection string
- `MONGODB_DB_NAME`: Database name (defaults to `plum_and_thread`)

### Local Development
```bash
npm install
npm run dev
```
The full-stack Express + Vite server runs on `http://localhost:3000`. Customer proforma submissions are persisted to the `proforma_requests` collection via `POST /api/proforma`.

### Production Build & Lint Verification
```bash
npm run lint
npm run build
npm start
```

---

## Catalog & GST Specification

All 8 SKUs are implemented with deterministic INR formatting (`Intl.NumberFormat('en-IN')`) and exact statutory GST slab calculations:

| SKU | Product | Unit Price (INR) | GST Rate | HSN Code |
| :--- | :--- | ---: | ---: | :---: |
| `PT-RNT-180` | Round-neck T-shirt | ₹165 | 5% | 6109 |
| `PT-POL-240` | Polo T-shirt | ₹235 | 5% | 6105 |
| `PT-HDY-380` | Hoodie | ₹480 | 5% | 6110 |
| `PT-TRK-280` | Track pant | ₹320 | 5% | 6103 |
| `PT-JKT-320` | Padded jacket | ₹2,850 | 18% | 6201 |
| `PT-CAP-260` | Logo cap | ₹95 | 12% | 6505 |
| `PT-KDR-200` | Kids romper | ₹140 | 5% | 6111 |
| `PT-SHT-250` | Shorts | ₹150 | 5% | 6104 |

### Quotation Calculator Features
- **Clean Initial State**: Starts empty with no pre-selected products; users explicitly add only the garments they need.
- **Add / Update / Remove**: Add garments directly from catalog cards or via the quick-add selector (defaulting to quantity `1`); adjust quantities via `−` / `+` steppers or direct numeric input; remove individual line items.
- **Anti-Negative Guard**: Input handlers block `-`, `+`, `e`, `E`, and `.` keys and clamp quantities to positive integers (`>= 1`).
- **Reset & Clear Actions**: `Reset Quantities` sets all selected item quantities back to `1`; `Clear Quotation` empties the sheet back to the empty state.
- **Exact GST Breakdown**: Computes per-item subtotal, per-item GST, slab-wise GST summary (`5%`, `12%`, `18%`), total GST payable, and grand total.
- **Light & Dark Theme Support**: Persisted Light / Dark mode toggle accessible in the Hero utility bar and Footer (`localStorage`).
- **CSV Export & Print**: Export itemized quotes as `.csv` or print/save as PDF with dedicated `@media print` styling.

---

## Architecture & Design Decisions

1. **Color & Surface Discipline (60-30-10)**: Built around crisp neutral studio surfaces (`#F8F8FA`, `#FFFFFF`), deep charcoal ink (`#141418`), and a single textile-inspired mulberry plum accent (`#5B2348`) with WCAG AA+ text contrast.
2. **Typography Pairing (2+1 System)**: `Bricolage Grotesque` for editorial display headings, `Plus Jakarta Sans` for readable body copy, and `JetBrains Mono` with `tabular-nums` for aligned pricing, GST slabs, and quantities.
3. **Component Modularity**:
   - `src/data/catalog.ts`: Typed catalog, manufacturing workflow steps, company KPIs, testimonials, and FAQs.
   - `src/utils/quotation.ts`: Pure calculation engine, currency formatters, input sanitizers, and CSV serializer.
   - `src/components/*`: Isolated semantic sections (`Navbar`, `HeroSection`, `ProductCatalog`, `QuotationCalculator`, `ManufacturingProcess`, `WhyChooseUs`, `TestimonialsSection`, `FaqSection`, `ContactFooter`).
4. **Accessibility & Responsiveness**: Semantic `<header>`, `<main>`, `<section>`, `<footer>`, `aria-expanded` FAQ accordions, keyboard focus rings (`focus-visible`), `prefers-reduced-motion` support, desktop ledger table paired with mobile-friendly line-item cards, and fallback containers on all imagery.

---

## AI Usage Disclosure

- **Code & Architecture**: Built using AI-assisted software engineering for component scaffolding, Tailwind CSS v4 styling, TypeScript type definitions, and deterministic quotation calculation logic. All pricing figures, GST slabs, and functional behaviors were verified directly against the assessment specification.
- **Visual Assets**: Custom product flat-lay studio photographs and the Tiruppur apparel mill hero image were generated using AI image generation (`src/assets/images/`) to avoid brittle external stock links and maintain a unified cool travertine studio aesthetic across all eight SKUs.
