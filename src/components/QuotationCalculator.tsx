import { useEffect, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import {
  Calculator,
  Check,
  Copy,
  Minus,
  Plus,
  Printer,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import {
  formatINR,
  formatINRWholeOrDecimal,
  formatQuotationSummaryText,
  QuotationSummary,
  sanitizeQuantity,
} from '../utils/quotation';

interface QuotationCalculatorProps {
  summary: QuotationSummary;
  onAddProduct: (productId: string, quantity?: number) => void;
  onUpdateQuantity: (productId: string, nextQuantity: number) => void;
  onRemoveProduct: (productId: string) => void;
  onResetQuotation: () => void;
  onClearQuotation: () => void;
  onRequestProforma: () => void;
  onExploreCatalog: () => void;
}

export function QuotationCalculator({
  summary,
  onAddProduct,
  onUpdateQuantity,
  onRemoveProduct,
  onResetQuotation,
  onClearQuotation,
  onRequestProforma,
  onExploreCatalog,
}: QuotationCalculatorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [quickAddQty, setQuickAddQty] = useState<string>('1');
  const [quickAddError, setQuickAddError] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isPrintModalOpen) {
      document.body.classList.remove('printing-quote-modal');
      return;
    }
    document.body.classList.add('printing-quote-modal');

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPrintModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('printing-quote-modal');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPrintModalOpen]);

  const handleQuickAdd = () => {
    const parsed = Number(quickAddQty);
    if (!Number.isFinite(parsed) || parsed < 1) {
      setQuickAddError('Quantity must be at least 1 unit.');
      return;
    }
    setQuickAddError('');
    onAddProduct(selectedProductId, sanitizeQuantity(parsed));
    setQuickAddQty('1');
  };

  const blockInvalidNumericKeys = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['-', '+', 'e', 'E', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleCopySummary = async () => {
    if (summary.lines.length === 0) return;
    const text = formatQuotationSummaryText(summary);
    let copied = false;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    if (copied) {
      setCopiedSummary(true);
      window.setTimeout(() => setCopiedSummary(false), 2500);
    }
  };

  const handleOpenPrintQuote = () => {
    if (summary.lines.length === 0) return;
    setIsPrintModalOpen(true);
    window.setTimeout(() => {
      try {
        window.print();
      } catch {
        // Native print dialog may be blocked in embedded previews; modal remains open
      }
    }, 150);
  };

  const isEmpty = summary.lines.length === 0;
  const allQuantitiesOne =
    !isEmpty && summary.lines.every((line) => line.quantity === 1);

  return (
    <section
      id="quotation"
      className="border-b border-[#E4E4E9] bg-white py-16 transition-colors duration-150 sm:py-20 dark:border-[#272730] dark:bg-[#14141A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#5B2348] dark:text-[#E3B8D3]">
              02. Instant B2B Quotation Calculator
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141418] [text-wrap:balance] sm:text-4xl dark:text-[#F4F4F6]">
              Build your multi-SKU estimate with exact HSN GST splits.
            </h2>
            <p className="mt-3 text-base text-[#4A4A55] dark:text-[#B4B4C0]">
              Add garments, adjust batch quantities starting from 1 unit, and review line-item
              subtotals, statutory 5%, 12%, and 18% GST calculations, and total order value.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 no-print">
            <button
              type="button"
              onClick={onResetQuotation}
              disabled={isEmpty || allQuantitiesOne}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#D4D4DC] bg-white px-4 py-2 text-xs font-semibold text-[#141418] transition-colors hover:bg-[#F8F8FA] disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:border-[#343440] dark:bg-[#1D1D26] dark:text-[#F4F4F6] dark:hover:bg-[#252530]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset Quantities</span>
            </button>
            <button
              type="button"
              onClick={onClearQuotation}
              disabled={isEmpty}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-[#D4D4DC] bg-white px-4 py-2 text-xs font-semibold text-[#9F1239] transition-colors hover:border-[#9F1239]/40 hover:bg-[#FFF1F2] disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:border-[#343440] dark:bg-[#1D1D26] dark:text-rose-300 dark:hover:border-rose-400/40 dark:hover:bg-rose-950/40"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Clear Quotation</span>
            </button>
          </div>
        </div>

        {/* Main 12-Column Calculator Workspace */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 8 Columns: Quick-Add Bar + Itemized Ledger */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Quick-Add Selector Bar */}
            <div className="rounded-xl border border-[#E4E4E9] bg-[#F8F8FA] p-4 sm:p-5 dark:border-[#272730] dark:bg-[#0D0D11] no-print">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label
                    htmlFor="quick-add-product"
                    className="block text-xs font-semibold text-[#141418] dark:text-[#F4F4F6]"
                  >
                    Select Product to Add
                  </label>
                  <select
                    id="quick-add-product"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#D4D4DC] bg-white px-3 text-sm text-[#141418] focus:border-[#5B2348] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B2348]/20 dark:border-[#343440] dark:bg-[#191922] dark:text-[#F4F4F6] dark:focus:border-[#D89AC4]"
                  >
                    {PRODUCTS.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} — {formatINRWholeOrDecimal(product.unitPrice)} (+
                        {product.gstRate}% GST)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:w-32">
                  <label
                    htmlFor="quick-add-qty"
                    className="block text-xs font-semibold text-[#141418] dark:text-[#F4F4F6]"
                  >
                    Quantity
                  </label>
                  <input
                    id="quick-add-qty"
                    type="number"
                    min={1}
                    step={1}
                    value={quickAddQty}
                    onKeyDown={blockInvalidNumericKeys}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setQuickAddQty('');
                        return;
                      }
                      const num = parseInt(val, 10);
                      if (!Number.isNaN(num) && num >= 0) {
                        setQuickAddQty(String(num));
                        setQuickAddError('');
                      }
                    }}
                    className="mt-1.5 h-11 w-full rounded-lg border border-[#D4D4DC] bg-white px-3 font-mono text-sm text-[#141418] tabular-nums focus:border-[#5B2348] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B2348]/20 dark:border-[#343440] dark:bg-[#191922] dark:text-[#F4F4F6] dark:focus:border-[#D89AC4]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#5B2348] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#461937] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:bg-[#7D3164] dark:hover:bg-[#913A74]"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>Add Product</span>
                </button>
              </div>
              {quickAddError && (
                <p role="alert" className="mt-2 text-xs font-medium text-[#9F1239] dark:text-rose-300">
                  {quickAddError}
                </p>
              )}
            </div>

            {/* Empty State or Active Ledger */}
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#CFCFD8] bg-[#F8F8FA] px-6 py-14 text-center dark:border-[#343440] dark:bg-[#0D0D11]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E4E4E9] bg-white text-[#5B2348] dark:border-[#272730] dark:bg-[#191922] dark:text-[#E3B8D3]">
                  <Calculator className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-[#141418] dark:text-[#F4F4F6]">
                  No products in your quotation yet
                </h3>
                <p className="mt-2 max-w-md text-sm text-[#4A4A55] dark:text-[#B4B4C0]">
                  Nothing is pre-selected. Choose a garment from the dropdown above or click
                  &ldquo;Add to Quotation&rdquo; on any item in the catalog to begin calculating
                  GST and order totals starting from 1 unit.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onExploreCatalog}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#5B2348] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#461937] whitespace-nowrap cursor-pointer dark:bg-[#7D3164] dark:hover:bg-[#913A74]"
                  >
                    <span>Browse Catalog</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddProduct('round-neck-tshirt', 1)}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-[#D4D4DC] bg-white px-4 py-2 text-sm font-semibold text-[#141418] transition-colors hover:bg-[#F1F1F4] whitespace-nowrap cursor-pointer dark:border-[#343440] dark:bg-[#191922] dark:text-[#F4F4F6] dark:hover:bg-[#252530]"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    <span>Add Round-neck T-shirt (Qty 1)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#E4E4E9] bg-white dark:border-[#272730] dark:bg-[#14141A]">
                {/* Desktop Ledger Table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[#E4E4E9] bg-[#F8F8FA] text-xs font-semibold text-[#4A4A55] dark:border-[#272730] dark:bg-[#191922] dark:text-[#B4B4C0]">
                        <th scope="col" className="px-4 py-3.5">
                          Garment / HSN
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-right">
                          Unit Price
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center">
                          Quantity
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-right">
                          Subtotal
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-right">
                          GST
                        </th>
                        <th scope="col" className="px-4 py-3.5 text-right">
                          Line Total
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-right no-print">
                          <span className="sr-only">Remove</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E4E9] text-sm dark:divide-[#272730]">
                      {summary.lines.map((line) => (
                        <tr
                          key={line.product.id}
                          className="hover:bg-[#FAFAFC] dark:hover:bg-[#1A1A23]"
                        >
                          <td className="px-4 py-4">
                            <p className="font-semibold text-[#141418] dark:text-[#F4F4F6]">
                              {line.product.name}
                            </p>
                            <p className="mt-0.5 text-xs text-[#5A5A66] tabular-nums dark:text-[#9E9EAB]">
                              {line.product.sku} · HSN {line.product.hsnCode} · GST{' '}
                              {line.product.gstRate}%
                            </p>
                          </td>
                          <td className="px-3 py-4 text-right font-mono text-[#141418] tabular-nums whitespace-nowrap dark:text-[#F4F4F6]">
                            {formatINRWholeOrDecimal(line.product.unitPrice)}
                          </td>
                          <td className="px-3 py-4">
                            <div className="mx-auto flex w-fit items-center rounded-lg border border-[#D4D4DC] bg-white dark:border-[#343440] dark:bg-[#191922]">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(
                                    line.product.id,
                                    Math.max(1, line.quantity - 1)
                                  )
                                }
                                disabled={line.quantity <= 1}
                                aria-label={`Decrease quantity of ${line.product.name}`}
                                className="inline-flex h-8 w-8 items-center justify-center text-[#141418] transition-colors hover:bg-[#F1F1F4] disabled:cursor-not-allowed disabled:opacity-35 cursor-pointer dark:text-[#F4F4F6] dark:hover:bg-[#252530]"
                              >
                                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                              <input
                                type="number"
                                min={1}
                                step={1}
                                aria-label={`Quantity for ${line.product.name}`}
                                value={line.quantity}
                                onKeyDown={blockInvalidNumericKeys}
                                onChange={(e) => {
                                  const raw = parseInt(e.target.value, 10);
                                  if (Number.isNaN(raw)) return;
                                  onUpdateQuantity(line.product.id, sanitizeQuantity(raw));
                                }}
                                onBlur={(e) => {
                                  const raw = parseInt(e.target.value, 10);
                                  onUpdateQuantity(line.product.id, sanitizeQuantity(raw));
                                }}
                                className="h-8 w-16 border-x border-[#E4E4E9] bg-transparent text-center font-mono text-sm font-medium text-[#141418] tabular-nums focus:bg-[#F5EEF2] focus:outline-none dark:border-[#343440] dark:text-[#F4F4F6] dark:focus:bg-[#2A1925]"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(line.product.id, line.quantity + 1)
                                }
                                aria-label={`Increase quantity of ${line.product.name}`}
                                className="inline-flex h-8 w-8 items-center justify-center text-[#141418] transition-colors hover:bg-[#F1F1F4] cursor-pointer dark:text-[#F4F4F6] dark:hover:bg-[#252530]"
                              >
                                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          </td>
                          <td className="px-3 py-4 text-right font-mono text-[#141418] tabular-nums whitespace-nowrap dark:text-[#F4F4F6]">
                            {formatINR(line.subtotal)}
                          </td>
                          <td className="px-3 py-4 text-right font-mono text-[#4A4A55] tabular-nums whitespace-nowrap dark:text-[#B4B4C0]">
                            <div>{formatINR(line.gstAmount)}</div>
                            <div className="text-[11px] text-[#6A6A76] dark:text-[#8E8E9B]">
                              ({line.product.gstRate}%)
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right font-mono font-semibold text-[#141418] tabular-nums whitespace-nowrap dark:text-white">
                            {formatINR(line.lineTotal)}
                          </td>
                          <td className="px-3 py-4 text-right no-print">
                            <button
                              type="button"
                              onClick={() => onRemoveProduct(line.product.id)}
                              aria-label={`Remove ${line.product.name} from quotation`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6A6A76] transition-colors hover:bg-[#FFF1F2] hover:text-[#9F1239] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B2348] dark:text-[#9E9EAB] dark:hover:bg-rose-950/50 dark:hover:text-rose-300"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Responsive Cards */}
                <div className="divide-y divide-[#E4E4E9] md:hidden dark:divide-[#272730]">
                  {summary.lines.map((line) => (
                    <div key={line.product.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-[#141418] dark:text-[#F4F4F6]">
                            {line.product.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-[#5A5A66] tabular-nums dark:text-[#9E9EAB]">
                            {formatINRWholeOrDecimal(line.product.unitPrice)} / unit · GST{' '}
                            {line.product.gstRate}% · HSN {line.product.hsnCode}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveProduct(line.product.id)}
                          aria-label={`Remove ${line.product.name}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#6A6A76] hover:bg-[#FFF1F2] hover:text-[#9F1239] cursor-pointer dark:text-[#9E9EAB] dark:hover:bg-rose-950/50 dark:hover:text-rose-300"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex items-center rounded-lg border border-[#D4D4DC] bg-white dark:border-[#343440] dark:bg-[#191922]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(line.product.id, Math.max(1, line.quantity - 1))
                            }
                            disabled={line.quantity <= 1}
                            aria-label={`Decrease quantity of ${line.product.name}`}
                            className="inline-flex h-10 w-10 items-center justify-center text-[#141418] disabled:opacity-35 dark:text-[#F4F4F6]"
                          >
                            <Minus className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            step={1}
                            aria-label={`Quantity for ${line.product.name}`}
                            value={line.quantity}
                            onKeyDown={blockInvalidNumericKeys}
                            onChange={(e) => {
                              const raw = parseInt(e.target.value, 10);
                              if (Number.isNaN(raw)) return;
                              onUpdateQuantity(line.product.id, sanitizeQuantity(raw));
                            }}
                            className="h-10 w-16 border-x border-[#E4E4E9] bg-transparent text-center font-mono text-sm font-medium text-[#141418] tabular-nums dark:border-[#343440] dark:text-[#F4F4F6]"
                          />
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(line.product.id, line.quantity + 1)}
                            aria-label={`Increase quantity of ${line.product.name}`}
                            className="inline-flex h-10 w-10 items-center justify-center text-[#141418] dark:text-[#F4F4F6]"
                          >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="text-right font-mono tabular-nums">
                          <p className="text-xs text-[#5A5A66] dark:text-[#9E9EAB]">
                            Sub: {formatINR(line.subtotal)} + GST: {formatINR(line.gstAmount)}
                          </p>
                          <p className="mt-0.5 text-base font-semibold text-[#141418] dark:text-white">
                            {formatINR(line.lineTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 4 Columns: GST Summary & Export Panel */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-[#24242B] bg-[#141418] p-6 text-white dark:border-[#2E2E3A] dark:bg-[#191922]">
              <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
                <h3 className="font-display text-xl font-semibold">Quotation Summary</h3>
                <span className="font-mono text-xs text-white/70 tabular-nums">
                  {summary.totalLineItems} {summary.totalLineItems === 1 ? 'SKU' : 'SKUs'} ·{' '}
                  {summary.totalUnits} pcs
                </span>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-white/75">Taxable Subtotal</dt>
                  <dd className="font-mono font-medium tabular-nums">
                    {formatINR(summary.subtotal)}
                  </dd>
                </div>

                {/* Product-Wise GST Slab Breakdown */}
                {summary.gstSlabs.length > 0 && (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-3.5">
                    <p className="text-xs font-medium text-white/75">GST Breakdown by Slab</p>
                    <div className="mt-2.5 space-y-2">
                      {summary.gstSlabs.map((slab) => (
                        <div
                          key={slab.rate}
                          className="flex items-center justify-between text-xs tabular-nums"
                        >
                          <span className="text-white/80">
                            GST {slab.rate}% on {formatINR(slab.taxableValue)}
                          </span>
                          <span className="font-mono font-medium text-white">
                            {formatINR(slab.gstAmount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-white/15 pt-3">
                  <dt className="text-white/75">Total GST Payable</dt>
                  <dd className="font-mono font-medium tabular-nums">
                    {formatINR(summary.totalGst)}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between border-t border-white/15 pt-4">
                  <dt className="font-display text-base font-semibold">Grand Total (Incl. GST)</dt>
                  <dd className="font-mono text-2xl font-semibold tracking-tight text-white tabular-nums">
                    {formatINR(summary.grandTotal)}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-xs leading-relaxed text-white/65">
                Ex-mill Tiruppur rates. Custom embroidery, screen print, and courier freight quoted
                upon formal proforma review.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 no-print">
                <button
                  type="button"
                  onClick={onRequestProforma}
                  disabled={isEmpty}
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#5B2348] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6E2C58] disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-[#7D3164] dark:hover:bg-[#913A74]"
                >
                  Request Formal Proforma Invoice
                </button>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    disabled={isEmpty}
                    className={`inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap cursor-pointer ${
                      copiedSummary
                        ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-200'
                        : 'border-white/20 bg-transparent text-white hover:bg-white/10'
                    }`}
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenPrintQuote}
                    disabled={isEmpty}
                    className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Print Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Printable Quotation Preview Portal */}
      {isPrintModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id="printable-quote-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="printable-quote-title"
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8"
          >
            <div className="w-full max-w-3xl rounded-xl border border-[#E4E4E9] bg-white p-6 text-[#141418] shadow-xl sm:p-8">
              {/* Top Modal Toolbar (Hidden when printing) */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E4E9] pb-4 no-print">
                <span className="text-xs font-semibold text-[#5B2348]">
                  Printable GST Quotation Preview
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#D4D4DC] bg-white px-3 py-1.5 text-xs font-semibold text-[#141418] hover:bg-[#F8F8FA] cursor-pointer"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-[#5B2348] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#461937] cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPrintModalOpen(false)}
                    aria-label="Close printable quotation preview"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D4D4DC] text-[#141418] hover:bg-[#F1F1F4] cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Official Quote Sheet Header */}
              <div className="flex flex-col justify-between gap-4 border-b border-[#E4E4E9] pb-5 sm:flex-row sm:items-start">
                <div>
                  <h3 id="printable-quote-title" className="font-display text-2xl font-bold text-[#141418]">
                    Plum &amp; Thread Apparel Pvt. Ltd.
                  </h3>
                  <p className="mt-1 text-xs text-[#4A4A55]">
                    Plot 42, Avinashi Road Apparel Park, Tiruppur, Tamil Nadu 641652
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-[#5A5A66] tabular-nums">
                    GSTIN: 33AABCP8821K1Z4 · orders@plumandthread.in
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-xs font-semibold text-[#5B2348]">
                    B2B QUOTATION ESTIMATE
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#4A4A55] tabular-nums">
                    Date:{' '}
                    {new Date().toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-[#5A5A66] tabular-nums">
                    {summary.totalLineItems} SKUs · {summary.totalUnits} Total Units
                  </p>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="mt-5 overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#E4E4E9] bg-[#F8F8FA] font-semibold text-[#4A4A55]">
                      <th className="px-3 py-2.5">Item / HSN</th>
                      <th className="px-3 py-2.5 text-right">Rate</th>
                      <th className="px-3 py-2.5 text-right">Qty</th>
                      <th className="px-3 py-2.5 text-right">Subtotal</th>
                      <th className="px-3 py-2.5 text-right">GST</th>
                      <th className="px-3 py-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E4E9]">
                    {summary.lines.map((line) => (
                      <tr key={line.product.id}>
                        <td className="px-3 py-3">
                          <div className="font-semibold text-[#141418]">{line.product.name}</div>
                          <div className="text-[11px] text-[#5A5A66] tabular-nums">
                            {line.product.sku} · HSN {line.product.hsnCode}
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right font-mono tabular-nums">
                          {formatINRWholeOrDecimal(line.product.unitPrice)}
                        </td>
                        <td className="px-3 py-3 text-right font-mono tabular-nums">
                          {line.quantity}
                        </td>
                        <td className="px-3 py-3 text-right font-mono tabular-nums">
                          {formatINR(line.subtotal)}
                        </td>
                        <td className="px-3 py-3 text-right font-mono tabular-nums">
                          {formatINR(line.gstAmount)} ({line.product.gstRate}%)
                        </td>
                        <td className="px-3 py-3 text-right font-mono font-semibold tabular-nums">
                          {formatINR(line.lineTotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="mt-6 flex justify-end border-t border-[#E4E4E9] pt-5">
                <dl className="w-full max-w-xs space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#4A4A55]">Taxable Subtotal</dt>
                    <dd className="font-mono font-medium tabular-nums">
                      {formatINR(summary.subtotal)}
                    </dd>
                  </div>
                  {summary.gstSlabs.map((slab) => (
                    <div key={slab.rate} className="flex justify-between text-xs text-[#5A5A66]">
                      <dt>GST {slab.rate}% Slab</dt>
                      <dd className="font-mono tabular-nums">{formatINR(slab.gstAmount)}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-[#E4E4E9] pt-2">
                    <dt className="text-[#4A4A55]">Total GST</dt>
                    <dd className="font-mono font-medium tabular-nums">
                      {formatINR(summary.totalGst)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-[#141418] pt-2.5 text-base font-bold">
                    <dt>Grand Total (Incl. GST)</dt>
                    <dd className="font-mono text-[#5B2348] tabular-nums">
                      {formatINR(summary.grandTotal)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
