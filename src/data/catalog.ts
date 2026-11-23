export type ProductCategory =
  | 'All'
  | 'Tops & Fleece'
  | 'Bottoms'
  | 'Outerwear & Headwear'
  | 'Kidswear';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  unitPrice: number;
  gstRate: 5 | 12 | 18;
  hsnCode: string;
  fabricSpec: string;
  gsm: string;
  leadTime: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_apparel_atelier_1795439068330.jpg',
  alt: 'Plum & Thread sunlit apparel manufacturing floor in Tiruppur with bolts of plum and ecru cotton knit fabric and precision sewing stations',
};

export const PRODUCTS: Product[] = [
  {
    id: 'round-neck-tshirt',
    sku: 'PT-RNT-180',
    name: 'Round-neck T-shirt',
    category: 'Tops & Fleece',
    unitPrice: 165,
    gstRate: 5,
    hsnCode: '6109',
    fabricSpec: '100% Combed Ring-Spun Cotton',
    gsm: '220 GSM',
    leadTime: '12–15 Days',
    description:
      'Bio-washed single jersey tee with high-recovery Lycra neck rib, shoulder-to-shoulder tape, and double-needle hems.',
    image: '/src/assets/images/product_round_neck_tee_1795439069072.jpg',
    imageAlt: 'Heavyweight combed cotton round-neck t-shirt in deep muted plum on a stone surface',
  },
  {
    id: 'polo-tshirt',
    sku: 'PT-POL-240',
    name: 'Polo T-shirt',
    category: 'Tops & Fleece',
    unitPrice: 235,
    gstRate: 5,
    hsnCode: '6105',
    fabricSpec: 'Combed Cotton Matty Pique',
    gsm: '240 GSM',
    leadTime: '14–18 Days',
    description:
      'Breathable honeycomb pique knit featuring a structured flat-knit collar, reinforced 2-button box placket, and side vents.',
    image: '/src/assets/images/product_polo_tshirt_1795439069399.jpg',
    imageAlt: 'Charcoal slate cotton pique polo t-shirt with woven collar placket',
  },
  {
    id: 'hoodie',
    sku: 'PT-HDY-380',
    name: 'Hoodie',
    category: 'Tops & Fleece',
    unitPrice: 480,
    gstRate: 5,
    hsnCode: '6110',
    fabricSpec: '80/20 Cotton-Poly Brushed Fleece',
    gsm: '380 GSM',
    leadTime: '18–21 Days',
    description:
      'Heavyweight three-thread brushed fleece pullover with double-lined hood, bartacked kangaroo pocket, and 2x2 ribbed cuffs.',
    image: '/src/assets/images/product_fleece_hoodie_1795439069978.jpg',
    imageAlt: 'Heavyweight brushed fleece pullover hoodie in deep burgundy-plum',
  },
  {
    id: 'track-pant',
    sku: 'PT-TRK-280',
    name: 'Track pant',
    category: 'Bottoms',
    unitPrice: 320,
    gstRate: 5,
    hsnCode: '6103',
    fabricSpec: 'Loopback French Terry',
    gsm: '280 GSM',
    leadTime: '15–18 Days',
    description:
      'Tapered athletic fit with multi-needle elasticated waistband, metal-tipped cotton drawcord, and deep zippered pockets.',
    image: '/src/assets/images/product_track_pant_1795439069888.jpg',
    imageAlt: 'Tailored dark graphite cotton-fleece track pants with ribbed cuffs',
  },
  {
    id: 'padded-jacket',
    sku: 'PT-JKT-320',
    name: 'Padded jacket',
    category: 'Outerwear & Headwear',
    unitPrice: 2850,
    gstRate: 18,
    hsnCode: '6201',
    fabricSpec: 'Water-Repellent Matte Nylon + Polyfill',
    gsm: '320 GSM Fill',
    leadTime: '22–28 Days',
    description:
      'Insulated winter baffle jacket built with windproof matte ripstop outer shell, YKK two-way zipper, and storm hood.',
    image: '/src/assets/images/product_padded_jacket_1795439070664.jpg',
    imageAlt: 'Quilted winter padded jacket with matte dark plum-black shell',
  },
  {
    id: 'logo-cap',
    sku: 'PT-CAP-260',
    name: 'Logo cap',
    category: 'Outerwear & Headwear',
    unitPrice: 95,
    gstRate: 12,
    hsnCode: '6505',
    fabricSpec: 'Heavy Brushed Cotton Twill',
    gsm: '260 GSM',
    leadTime: '10–12 Days',
    description:
      'Structured 6-panel crown built for 3D puff or flat embroidery, pre-curved visor, stitched eyelets, and brass buckle strap.',
    image: '/src/assets/images/product_logo_cap_1795439072358.jpg',
    imageAlt: 'Structured 6-panel brushed cotton twill cap in deep plum',
  },
  {
    id: 'kids-romper',
    sku: 'PT-KDR-200',
    name: 'Kids romper',
    category: 'Kidswear',
    unitPrice: 140,
    gstRate: 5,
    hsnCode: '6111',
    fabricSpec: '100% Organic Interlock Cotton',
    gsm: '200 GSM',
    leadTime: '14–16 Days',
    description:
      'OEKO-TEX certified ultra-soft interlock knit with nickel-free brass snap closures, gentle ribbed binding, and tagless neck print.',
    image: '/src/assets/images/product_kids_romper_1795439072085.jpg',
    imageAlt: 'Soft organic cotton baby romper in natural ecru with muted plum trim',
  },
  {
    id: 'shorts',
    sku: 'PT-SHT-250',
    name: 'Shorts',
    category: 'Bottoms',
    unitPrice: 150,
    gstRate: 5,
    hsnCode: '6104',
    fabricSpec: 'Combed Cotton French Terry',
    gsm: '250 GSM',
    leadTime: '12–15 Days',
    description:
      'Above-knee leisure shorts with breathable unbrushed terry interior, triple-stitched waistband, and reinforced side-seam pockets.',
    image: '/src/assets/images/product_cotton_shorts_1795439072755.jpg',
    imageAlt: 'Heather ash grey combed cotton French terry shorts with drawcord',
  },
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'All',
  'Tops & Fleece',
  'Bottoms',
  'Outerwear & Headwear',
  'Kidswear',
];

export interface CompanyStat {
  value: string;
  label: string;
  detail: string;
}

export const COMPANY_STATS: CompanyStat[] = [
  {
    value: '4.2M+',
    label: 'Annual Garments Shipped',
    detail: 'Across domestic retail & 14 export markets',
  },
  {
    value: '99.1%',
    label: 'On-Time Dispatch SLA',
    detail: 'Tracked across 1,400+ production batches',
  },
  {
    value: '180+',
    label: 'Active Brand Partners',
    detail: 'D2C labels, corporate fleets & school networks',
  },
  {
    value: '100%',
    label: 'ZLD Effluent Dyeing',
    detail: 'Zero-liquid-discharge Tiruppur mill network',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  checkpoint: string;
}

export const MANUFACTURING_PROCESS: ProcessStep[] = [
  {
    number: '01.',
    title: 'Yarn Sourcing & Circular Knitting',
    duration: 'Days 1–3',
    description:
      'Long-staple Tamil Nadu cotton yarns are knitted in-house on Meyer & Cie circular machines to exact GSM and shrinkage tolerances.',
    checkpoint: 'Greige GSM & spirality verification',
  },
  {
    number: '02.',
    title: 'Eco Dyeing & Bio-Wash',
    duration: 'Days 4–6',
    description:
      'Pantone-matched reactive dyeing in Zero-Liquid-Discharge vessels followed by enzyme bio-polishing for pill-free handfeel.',
    checkpoint: 'Spectrophotometer shade match & AATCC wash test',
  },
  {
    number: '03.',
    title: 'CAD Grading & Laser Cutting',
    duration: 'Days 7–8',
    description:
      'Gerber CAD pattern nesting minimizes fabric waste under 6% while automated straight-knife cutting guarantees size uniformity.',
    checkpoint: 'Ply-height tolerance check across XS–3XL',
  },
  {
    number: '04.',
    title: 'Modular Stitching & Branding',
    duration: 'Days 9–13',
    description:
      'Juki flatlock, overlock, and bar-tack lines assemble garments alongside in-house screen printing, DTF, and Tajima embroidery.',
    checkpoint: 'In-line needle detection & seam tension audit',
  },
  {
    number: '05.',
    title: 'AQL 2.5 QC & GST Dispatch',
    duration: 'Days 14–15',
    description:
      'Every batch passes steam pressing, 4-point AQL 2.5 inspection, custom polybagging, and HSN-compliant GST invoicing for pan-India freight.',
    checkpoint: 'Final carton audit & barcoded packing list',
  },
];

export interface AdvantageItem {
  id: string;
  index: string;
  title: string;
  metric: string;
  description: string;
  featured?: boolean;
}

export const WHY_CHOOSE_US: AdvantageItem[] = [
  {
    id: 'vertical-mill',
    index: '01',
    title: 'Vertically Integrated in Tiruppur',
    metric: '18% lower unit cost vs. multi-vendor brokers',
    description:
      'Knitting, dyeing, embroidery, and final packing happen within our 64,000 sq. ft. Tiruppur campus—eliminating middlemen markups and transit delays.',
    featured: true,
  },
  {
    id: 'fast-sampling',
    index: '02',
    title: '48-Hour Tech Pack Sampling',
    metric: '2-day physical proto turnaround',
    description:
      'Submit a Pantone code and size spec; our sample room dispatches pre-production prototypes via air courier within 48 hours.',
  },
  {
    id: 'gst-transparency',
    index: '03',
    title: 'HSN-Verified GST Billing',
    metric: '5% / 12% / 18% automated tax splits',
    description:
      'Clean B2B tax invoices mapped to exact garment HSN codes so corporate procurement teams claim 100% Input Tax Credit without reconciliation friction.',
  },
  {
    id: 'aql-inspection',
    index: '04',
    title: 'AQL 2.5 Quality Guarantee',
    metric: '< 0.4% post-delivery defect claim rate',
    description:
      'Independent floor inspectors audit fabric GSM, colorfastness, stitch density (12–14 SPI), and snap pull-strength before cartons leave the dock.',
    featured: true,
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  outcome: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Before switching to Plum & Thread, our previous supplier missed two festive drops due to dyeing bottlenecks. Since moving 30,000 units of 220 GSM tees and 380 GSM hoodies to their Tiruppur line, every shipment has cleared our Mumbai warehouse 4 days ahead of schedule.',
    author: 'Karthik Subramanian',
    role: 'Head of Supply Chain',
    company: 'Kaveri Essentials Co.',
    outcome: '0 missed launches across 6 seasonal drops',
  },
  {
    id: 't2',
    quote:
      'Corporate uniform procurement used to mean chasing four separate vendors for polos, caps, and winter jackets—and messy GST invoices. Plum & Thread delivers all three under one consolidated PO with clean 5%, 12%, and 18% HSN tax splits.',
    author: 'Meera Deshmukh',
    role: 'VP of Workplace Operations',
    company: 'Vanguard Mobility Systems',
    outcome: '34% faster procurement cycle time',
  },
  {
    id: 't3',
    quote:
      'For our organic babywear line, fabric safety and snap durability are non-negotiable. Their 200 GSM interlock rompers passed third-party OEKO-TEX testing on the first submission and cut our defect return rate from 2.8% down to 0.3%.',
    author: 'Rohan Nair',
    role: 'Co-Founder',
    company: 'Little Looms Bengaluru',
    outcome: 'Defect rate reduced from 2.8% to 0.3%',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-moq',
    question: 'What is the minimum order quantity (MOQ) per SKU?',
    answer:
      'Our standard production MOQ is 100 pieces per colorway across mixed sizes (XS to 3XL) for stocked yarn shades, and 250 pieces for custom Pantone-dyed fabrics. However, our quotation calculator lets you estimate pricing at any quantity starting from 1 unit for sample and pilot validation.',
  },
  {
    id: 'faq-gst',
    question: 'How are GST rates applied across apparel and headwear items?',
    answer:
      'We apply exact statutory GST slabs per HSN classification: knitted garments including Round-neck T-shirts, Polo T-shirts, Hoodies, Track pants, Kids rompers, and Shorts carry 5% GST; Logo caps (HSN 6505) carry 12% GST; and insulated Padded jackets carry 18% GST. Full tax invoices enable seamless Input Tax Credit.',
  },
  {
    id: 'faq-branding',
    question: 'Can you add custom screen printing, embroidery, or woven neck labels?',
    answer:
      'Yes. Our Tiruppur facility houses 12-head Tajima embroidery machines, automatic MHM screen-printing carousels (water-based, plastisol, and high-density puff inks), DTF transfers, and custom satin/cotton woven neck labels and hangtags.',
  },
  {
    id: 'faq-sampling',
    question: 'How long does custom sampling and bulk production take?',
    answer:
      'Standard blank or logo-embroidered prototypes ship within 48 to 72 hours. Bulk production lead times range from 10–12 days for caps and tees up to 22–28 days for multi-layer padded winter jackets, depending on order volume.',
  },
  {
    id: 'faq-fabric',
    question: 'Do your fabrics undergo shrinkage and colorfastness testing?',
    answer:
      'Every dyed lot is tested in our internal textile lab for GSM consistency (±3%), dimensional stability (under 3% shrinkage after 3 washes), and rubbing/wash colorfastness (Grade 4–4.5) prior to cutting.',
  },
  {
    id: 'faq-shipping',
    question: 'Do you ship pan-India and handle international export documentation?',
    answer:
      'Yes. Domestic orders ship via insured surface or air cargo from Tiruppur and Coimbatore hubs to any Indian PIN code. For international buyers, we handle FOB Chennai/Tuticorin sea freight and DHL/FedEx air express with full certificate of origin.',
  },
];
