import { useState } from 'react';
import { Check, Minus, Plus, Shirt } from 'lucide-react';
import {
  Product,
  PRODUCT_CATEGORIES,
  ProductCategory,
  PRODUCTS,
} from '../data/catalog';
import { formatINRWholeOrDecimal, QuotationLineItem } from '../utils/quotation';

interface ProductCatalogProps {
  quotationItems: QuotationLineItem[];
  onAddProduct: (productId: string) => void;
  onUpdateQuantity: (productId: string, nextQty: number) => void;
  onRemoveProduct: (productId: string) => void;
  onJumpToQuotation: () => void;
}

function ProductCard({
  product,
  quantityInQuote,
  onAdd,
  onIncrement,
  onDecrement,
}: {
  product: Product;
  quantityInQuote: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#E4E4E9] bg-white transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#C8C8D2] dark:border-[#272730] dark:bg-[#14141A] dark:hover:border-[#424252]">
      {/* Uniform 4:3 Studio Backdrop */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F1F1F4] dark:bg-[#1D1D26]">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F1F1F4] to-[#E9E4E8] p-6 text-center dark:from-[#1D1D26] dark:to-[#271C24]">
            <Shirt className="h-8 w-8 text-[#5B2348] dark:text-[#E3B8D3]" aria-hidden="true" />
            <span className="mt-2 text-xs font-medium text-[#4A4A55] dark:text-[#B4B4C0]">
              {product.name}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-xs text-[#5A5A66] tabular-nums dark:text-[#9E9EAB]">
            <span>{product.sku}</span>
            <span aria-hidden="true" className="mx-1.5 text-[#C4C4CE] dark:text-[#444452]">
              ·
            </span>
            <span>{product.gsm}</span>
            <span aria-hidden="true" className="mx-1.5 text-[#C4C4CE] dark:text-[#444452]">
              ·
            </span>
            <span>GST {product.gstRate}%</span>
          </p>

          <h3 className="mt-2 font-display text-lg font-semibold text-[#141418] dark:text-[#F4F4F6]">
            {product.name}
          </h3>

          <p className="mt-1 text-xs font-medium text-[#5B2348] dark:text-[#E3B8D3]">
            {product.fabricSpec}
          </p>

          <p className="mt-2.5 text-sm leading-relaxed text-[#4A4A55] dark:text-[#B4B4C0]">
            {product.description}
          </p>
        </div>

        {/* Aligned Pricing & Action Baseline */}
        <div className="mt-5 border-t border-[#E4E4E9] pt-4 dark:border-[#272730]">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <span className="font-mono text-lg font-semibold text-[#141418] tabular-nums dark:text-[#F4F4F6]">
                {formatINRWholeOrDecimal(product.unitPrice)}
              </span>
              <span className="ml-1 text-xs text-[#6A6A76] dark:text-[#9E9EAB]">/ unit</span>
            </div>
            <span className="text-xs text-[#5A5A66] tabular-nums dark:text-[#9E9EAB]">
              HSN {product.hsnCode} · {product.leadTime}
            </span>
          </div>

          <div className="mt-3">
            {quantityInQuote === 0 ? (
              <button
                type="button"
                onClick={onAdd}
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#141418] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#5B2348] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:bg-[#2B2B36] dark:hover:bg-[#7D3164]"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Add to Quotation</span>
              </button>
            ) : (
              <div className="flex items-center justify-between gap-2 rounded-lg border border-[#5B2348]/25 bg-[#F5EEF2] p-1 dark:border-[#9E4E82]/40 dark:bg-[#2A1925]">
                <button
                  type="button"
                  onClick={onDecrement}
                  aria-label={`Decrease ${product.name} quantity in quotation`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-[#141418] transition-colors hover:bg-[#E8DCE3] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B2348] dark:bg-[#14141A] dark:text-[#F4F4F6] dark:hover:bg-[#3A2233]"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#5B2348] tabular-nums dark:text-[#F0C8E2]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{quantityInQuote} in quote</span>
                </span>
                <button
                  type="button"
                  onClick={onIncrement}
                  aria-label={`Increase ${product.name} quantity in quotation`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-[#141418] transition-colors hover:bg-[#E8DCE3] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B2348] dark:bg-[#14141A] dark:text-[#F4F4F6] dark:hover:bg-[#3A2233]"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProductCatalog({
  quotationItems,
  onAddProduct,
  onUpdateQuantity,
  onRemoveProduct,
  onJumpToQuotation,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === selectedCategory);

  const quantityLookup = new Map(quotationItems.map((item) => [item.productId, item.quantity]));

  return (
    <section
      id="catalog"
      className="border-b border-[#E4E4E9] bg-[#F8F8FA] py-16 transition-colors duration-150 sm:py-20 dark:border-[#272730] dark:bg-[#0D0D11]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#5B2348] dark:text-[#E3B8D3]">
              01. Core Manufacturing Catalog
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141418] [text-wrap:balance] sm:text-4xl dark:text-[#F4F4F6]">
              Eight production-ready apparel SKUs with fixed ex-mill rates.
            </h2>
            <p className="mt-3 text-base text-[#4A4A55] dark:text-[#B4B4C0]">
              Select any garment to add it directly to your live GST quotation worksheet below.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <div
              role="tablist"
              aria-label="Filter catalog by garment category"
              className="flex flex-wrap items-center gap-1 rounded-lg border border-[#E4E4E9] bg-[#F1F1F4] p-1 dark:border-[#272730] dark:bg-[#191922]"
            >
              {PRODUCT_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#5B2348] ${
                      isActive
                        ? 'bg-white text-[#141418] shadow-xs dark:bg-[#2B2B36] dark:text-white'
                        : 'text-[#4A4A55] hover:text-[#141418] dark:text-[#A8A8B3] dark:hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const qty = quantityLookup.get(product.id) ?? 0;
            return (
              <ProductCard
                key={product.id}
                product={product}
                quantityInQuote={qty}
                onAdd={() => onAddProduct(product.id)}
                onIncrement={() => onUpdateQuantity(product.id, qty + 1)}
                onDecrement={() => {
                  if (qty <= 1) {
                    onRemoveProduct(product.id);
                  } else {
                    onUpdateQuantity(product.id, qty - 1);
                  }
                }}
              />
            );
          })}
        </div>

        {/* Subtle Bottom Action Bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-[#E4E4E9] bg-white px-5 py-4 sm:flex-row sm:items-center dark:border-[#272730] dark:bg-[#14141A]">
          <p className="text-sm text-[#4A4A55] dark:text-[#B4B4C0]">
            Showing{' '}
            <span className="font-semibold text-[#141418] tabular-nums dark:text-white">
              {filteredProducts.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-[#141418] tabular-nums dark:text-white">
              {PRODUCTS.length}
            </span>{' '}
            garments · Custom Pantone dyeing &amp; screen printing available on all SKUs.
          </p>
          <button
            type="button"
            onClick={onJumpToQuotation}
            className="text-sm font-semibold text-[#5B2348] underline-offset-4 hover:underline whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:text-[#E3B8D3]"
          >
            Jump to GST Quotation Ledger →
          </button>
        </div>
      </div>
    </section>
  );
}
