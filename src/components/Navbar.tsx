import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  quoteItemCount: number;
  onScrollToQuotation: () => void;
}

const NAV_LINKS = [
  { label: 'Catalog', href: '#catalog' },
  { label: 'Quotation', href: '#quotation' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar({ quoteItemCount, onScrollToQuotation }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E4E4E9] bg-[#FFFFFF]/95 backdrop-blur-sm transition-colors duration-150 dark:border-[#272730] dark:bg-[#14141A]/95 no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Unique stitched atelier seal + needle & flowing thread logo */}
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-[#141418] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B2348] dark:text-[#F4F4F6] dark:focus-visible:outline-[#D89AC4]"
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:scale-105 [--pt-start:#5B2348] [--pt-end:#9E3E7B] dark:[--pt-start:#F2CCE5] dark:[--pt-end:#C96CA8]"
          >
            <defs>
              <linearGradient
                id="pt-thread-grad"
                x1="8"
                y1="6"
                x2="24"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="var(--pt-start)" />
                <stop offset="100%" stopColor="var(--pt-end)" />
              </linearGradient>
            </defs>
            <circle
              cx="16"
              cy="16"
              r="15"
              className="fill-[#F5EEF2] stroke-[#E2CEDB] dark:fill-[#2A1925] dark:stroke-[#523047]"
              strokeWidth="1"
            />
            <circle
              cx="16"
              cy="16"
              r="12.6"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 2.4"
              className="text-[#5B2348]/40 dark:text-[#E3B8D3]/45"
            />
            <path
              d="M21.4 8.8L9.6 23.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="text-[#141418] dark:text-[#F4F4F6]"
            />
            <ellipse
              cx="22.6"
              cy="7.3"
              rx="1.4"
              ry="2.3"
              transform="rotate(38 22.6 7.3)"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#141418] dark:text-[#F4F4F6]"
            />
            <path
              d="M22.2 7.6C18.2 4.6 9.8 6 9.1 11.4c-.6 4.3 6.4 4.1 10.4 6.1 3.1 1.5 2.7 6.1-3.7 6.8"
              stroke="url(#pt-thread-grad)"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
          </svg>
          <span>
            Plum{' '}
            <span className="text-[#5B2348] dark:text-[#E3B8D3]">&amp;</span>{' '}
            Thread
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A4A55] dark:text-[#B4B4C0]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 text-[#4A4A55] transition-colors duration-150 hover:text-[#141418] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#5B2348] after:transition-all after:duration-150 hover:after:w-full whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B2348] dark:text-[#B4B4C0] dark:hover:text-white dark:after:bg-[#D89AC4]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onScrollToQuotation}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#5B2348] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#461937] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:bg-[#7D3164] dark:hover:bg-[#913A74]"
          >
            {quoteItemCount > 0 ? `Get Quote (${quoteItemCount})` : 'Get Quote'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E4E4E9] text-[#141418] transition-colors hover:bg-[#F1F1F4] md:hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:border-[#2E2E38] dark:text-[#F4F4F6] dark:hover:bg-[#22222B]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-[#E4E4E9] bg-white px-4 py-4 md:hidden dark:border-[#272730] dark:bg-[#14141A]"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileNav(link.href);
                  }}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#141418] hover:bg-[#F1F1F4] dark:text-[#F4F4F6] dark:hover:bg-[#22222B]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
