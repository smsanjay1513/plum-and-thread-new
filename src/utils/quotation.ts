import { Product, PRODUCTS } from '../data/catalog';

export interface QuotationLineItem {
  productId: string;
  quantity: number;
}

export interface CalculatedLineItem {
  product: Product;
  quantity: number;
  subtotal: number;
  gstAmount: number;
  lineTotal: number;
}

export interface GstSlabBreakdown {
  rate: 5 | 12 | 18;
  taxableValue: number;
  gstAmount: number;
  itemCount: number;
}

export interface QuotationSummary {
  lines: CalculatedLineItem[];
  totalLineItems: number;
  totalUnits: number;
  subtotal: number;
  totalGst: number;
  grandTotal: number;
  gstSlabs: GstSlabBreakdown[];
}

export const DEFAULT_QUOTATION_ITEMS: QuotationLineItem[] = [
  { productId: 'round-neck-tshirt', quantity: 50 },
  { productId: 'hoodie', quantity: 20 },
  { productId: 'logo-cap', quantity: 30 },
];

export function sanitizeQuantity(value: number): number {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 1;
  }
  const floored = Math.floor(value);
  return floored < 1 ? 1 : floored;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatINRWholeOrDecimal(amount: number): string {
  const isWhole = Math.abs(amount - Math.round(amount)) < 0.001;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateQuotation(
  items: QuotationLineItem[],
  catalog: Product[] = PRODUCTS
): QuotationSummary {
  const productMap = new Map(catalog.map((p) => [p.id, p]));
  const lines: CalculatedLineItem[] = [];

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) continue;

    const quantity = sanitizeQuantity(item.quantity);
    const subtotal = Number((product.unitPrice * quantity).toFixed(2));
    const gstAmount = Number(((subtotal * product.gstRate) / 100).toFixed(2));
    const lineTotal = Number((subtotal + gstAmount).toFixed(2));

    lines.push({
      product,
      quantity,
      subtotal,
      gstAmount,
      lineTotal,
    });
  }

  let totalUnits = 0;
  let subtotal = 0;
  let totalGst = 0;

  const slabMap = new Map<5 | 12 | 18, GstSlabBreakdown>();

  for (const line of lines) {
    totalUnits += line.quantity;
    subtotal += line.subtotal;
    totalGst += line.gstAmount;

    const existingSlab = slabMap.get(line.product.gstRate);
    if (existingSlab) {
      existingSlab.taxableValue = Number((existingSlab.taxableValue + line.subtotal).toFixed(2));
      existingSlab.gstAmount = Number((existingSlab.gstAmount + line.gstAmount).toFixed(2));
      existingSlab.itemCount += 1;
    } else {
      slabMap.set(line.product.gstRate, {
        rate: line.product.gstRate,
        taxableValue: line.subtotal,
        gstAmount: line.gstAmount,
        itemCount: 1,
      });
    }
  }

  subtotal = Number(subtotal.toFixed(2));
  totalGst = Number(totalGst.toFixed(2));
  const grandTotal = Number((subtotal + totalGst).toFixed(2));

  const gstSlabs = Array.from(slabMap.values()).sort((a, b) => a.rate - b.rate);

  return {
    lines,
    totalLineItems: lines.length,
    totalUnits,
    subtotal,
    totalGst,
    grandTotal,
    gstSlabs,
  };
}

export function exportQuotationToCsv(summary: QuotationSummary): string {
  const headers = [
    'SKU',
    'Product Name',
    'HSN Code',
    'Quantity',
    'Unit Price (INR)',
    'Subtotal (INR)',
    'GST Rate (%)',
    'GST Amount (INR)',
    'Line Total (INR)',
  ];

  const rows = summary.lines.map((line) => [
    line.product.sku,
    `"${line.product.name}"`,
    line.product.hsnCode,
    line.quantity.toString(),
    line.product.unitPrice.toFixed(2),
    line.subtotal.toFixed(2),
    `${line.product.gstRate}%`,
    line.gstAmount.toFixed(2),
    line.lineTotal.toFixed(2),
  ]);

  rows.push([]);
  rows.push(['', 'Total Units', '', summary.totalUnits.toString(), '', '', '', '', '']);
  rows.push(['', 'Taxable Subtotal (INR)', '', '', '', summary.subtotal.toFixed(2), '', '', '']);
  rows.push(['', 'Total GST (INR)', '', '', '', '', '', summary.totalGst.toFixed(2), '']);
  rows.push(['', 'Grand Total (INR)', '', '', '', '', '', '', summary.grandTotal.toFixed(2)]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function formatQuotationSummaryText(summary: QuotationSummary): string {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const itemLines = summary.lines.map(
    (line, idx) =>
      `${idx + 1}. ${line.product.name} (${line.product.sku} | HSN ${line.product.hsnCode}) — ` +
      `${line.quantity} × ${formatINRWholeOrDecimal(line.product.unitPrice)} = ${formatINR(line.subtotal)} ` +
      `+ ${line.product.gstRate}% GST (${formatINR(line.gstAmount)}) = ${formatINR(line.lineTotal)}`
  );

  const slabLines = summary.gstSlabs.map(
    (slab) =>
      `  • GST ${slab.rate}% on ${formatINR(slab.taxableValue)}: ${formatINR(slab.gstAmount)}`
  );

  return [
    `PLUM & THREAD — TIRUPPUR QUOTATION SUMMARY (${dateStr})`,
    `GSTIN: 33AABCP8821K1Z4 | Ex-Mill Apparel Estimate`,
    `------------------------------------------------------------`,
    ...itemLines,
    `------------------------------------------------------------`,
    `Total SKUs: ${summary.totalLineItems} | Total Pieces: ${summary.totalUnits}`,
    `Taxable Subtotal: ${formatINR(summary.subtotal)}`,
    ...slabLines,
    `Total GST Payable: ${formatINR(summary.totalGst)}`,
    `GRAND TOTAL (INCL. GST): ${formatINR(summary.grandTotal)}`,
  ].join('\n');
}

