import { useState } from 'react';
import { ArrowRight, Factory, Moon, Sun } from 'lucide-react';
import { ThemeMode } from '../App';
import { COMPANY_STATS, HERO_IMAGE } from '../data/catalog';

interface HeroSectionProps {
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  onStartQuote: () => void;
  onExploreCatalog: () => void;
}

export function HeroSection({
  theme,
  onChangeTheme,
  onStartQuote,
  onExploreCatalog,
}: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="border-b border-[#E4E4E9] bg-white transition-colors duration-150 dark:border-[#272730] dark:bg-[#14141A]"
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
        {/* Top Utility Row: Regional Credibility + Light/Dark Theme Switcher */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E4E9] pb-4 dark:border-[#272730]">
          <p className="text-xs font-medium tracking-wide text-[#5B2348] dark:text-[#E3B8D3]">
            Tiruppur, Tamil Nadu · ISO 9001:2015 &amp; OEKO-TEX® Standard 100 Mill
          </p>

          <div
            role="group"
            aria-label="Color theme preference"
            className="inline-flex items-center gap-1 rounded-lg border border-[#E4E4E9] bg-[#F1F1F4] p-1 dark:border-[#2E2E38] dark:bg-[#1D1D26] no-print"
          >
            <button
              type="button"
              onClick={() => onChangeTheme('light')}
              aria-pressed={theme === 'light'}
              className={`inline-flex min-h-[32px] items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#5B2348] ${
                theme === 'light'
                  ? 'bg-white text-[#141418] shadow-xs'
                  : 'text-[#5A5A66] hover:text-[#141418] dark:text-[#A8A8B3] dark:hover:text-white'
              }`}
            >
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeTheme('dark')}
              aria-pressed={theme === 'dark'}
              className={`inline-flex min-h-[32px] items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D89AC4] ${
                theme === 'dark'
                  ? 'bg-[#2B2B36] text-white shadow-xs'
                  : 'text-[#5A5A66] hover:text-[#141418] dark:text-[#A8A8B3] dark:hover:text-white'
              }`}
            >
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Copy Column */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <h1
                className="font-display font-bold tracking-tight text-[#141418] [text-wrap:balance] dark:text-[#F4F4F6]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.65rem)', lineHeight: 1.08 }}
              >
                Precision knitwear &amp; bulk apparel engineered in Tiruppur.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#4A4A55] sm:text-lg dark:text-[#B4B4C0]">
                From 220 GSM combed cotton tees to insulated winter outerwear, Plum &amp; Thread
                delivers factory-direct OEM/ODM production with transparent GST-split costing and
                AQL 2.5 inspection.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onStartQuote}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#5B2348] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#461937] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:bg-[#7D3164] dark:hover:bg-[#913A74]"
                >
                  <span>Build Bulk Quotation</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onExploreCatalog}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#D4D4DC] bg-white px-5 py-3 text-sm font-semibold text-[#141418] transition-colors duration-150 hover:border-[#141418] hover:bg-[#F8F8FA] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:border-[#343440] dark:bg-[#1D1D26] dark:text-[#F4F4F6] dark:hover:border-[#6A6A7A] dark:hover:bg-[#252530]"
                >
                  Explore 8 Core SKUs
                </button>
              </div>
            </div>

            <div className="mt-10 border-t border-[#E4E4E9] pt-5 text-xs text-[#5A5A66] dark:border-[#272730] dark:text-[#9E9EAB]">
              <span>Direct Ex-Mill Pricing</span>
              <span aria-hidden="true" className="mx-2 text-[#C4C4CE] dark:text-[#444452]">
                ·
              </span>
              <span>48-Hour Prototype Dispatch</span>
              <span aria-hidden="true" className="mx-2 text-[#C4C4CE] dark:text-[#444452]">
                ·
              </span>
              <span>HSN-Compliant 5% / 12% / 18% GST Invoices</span>
            </div>
          </div>

          {/* Right 16:9 Architectural Facility Visual */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#E4E4E9] bg-[#F1F1F4] lg:aspect-auto lg:h-full lg:min-h-[400px] dark:border-[#272730] dark:bg-[#1D1D26]">
              {!imgError ? (
                <img
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F1F1F4] to-[#E6E0E5] p-8 text-center dark:from-[#1D1D26] dark:to-[#271C24]">
                  <Factory className="h-10 w-10 text-[#5B2348] dark:text-[#E3B8D3]" aria-hidden="true" />
                  <p className="mt-3 font-display text-lg font-semibold text-[#141418] dark:text-[#F4F4F6]">
                    Plum &amp; Thread Tiruppur Production Floor
                  </p>
                  <p className="mt-1 text-sm text-[#5A5A66] dark:text-[#A8A8B3]">
                    64,000 sq. ft. knitting, dyeing &amp; finishing campus
                  </p>
                </div>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#141418]/80 via-[#141418]/25 to-transparent p-5 sm:p-6">
                <p className="text-xs font-medium text-white/90">
                  Avinashi Road Apparel Park, Tiruppur · Unit II Knitting &amp; Inspection Wing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Company Statistics Strip */}
        <div className="mt-12 rounded-xl border border-[#E4E4E9] bg-[#F8F8FA] dark:border-[#272730] dark:bg-[#0D0D11]">
          <dl className="grid grid-cols-1 divide-y divide-[#E4E4E9] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 dark:divide-[#272730]">
            {COMPANY_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-6 ${
                  idx === 2 || idx === 3
                    ? 'sm:border-t lg:border-t-0 sm:border-[#E4E4E9] dark:sm:border-[#272730]'
                    : ''
                }`}
              >
                <dt className="text-xs font-medium text-[#5A5A66] dark:text-[#9E9EAB]">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-mono text-3xl font-semibold tracking-tight text-[#141418] tabular-nums dark:text-[#F4F4F6]">
                  {stat.value}
                </dd>
                <p className="mt-1.5 text-xs text-[#6A6A76] dark:text-[#8E8E9B]">{stat.detail}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
