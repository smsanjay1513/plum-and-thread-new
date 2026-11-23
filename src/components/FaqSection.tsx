import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/catalog';

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="faq"
      className="border-b border-[#E4E4E9] bg-white py-16 transition-colors duration-150 sm:py-20 dark:border-[#272730] dark:bg-[#14141A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide text-[#5B2348] dark:text-[#E3B8D3]">
              06. Frequently Asked Questions
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141418] [text-wrap:balance] sm:text-4xl dark:text-[#F4F4F6]">
              Clear answers on MOQs, GST slabs, and Tiruppur lead times.
            </h2>
            <p className="mt-3 text-base text-[#4A4A55] dark:text-[#B4B4C0]">
              Everything procurement managers and retail founders need before issuing a purchase
              order or requesting fabric swatches.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[#E4E4E9] rounded-xl border border-[#E4E4E9] bg-[#F8F8FA] dark:divide-[#272730] dark:border-[#272730] dark:bg-[#0D0D11]">
              {FAQS.map((faq) => {
                const isOpen = openId === faq.id;
                const panelId = `${faq.id}-panel`;
                return (
                  <div key={faq.id} className="px-5 sm:px-6">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => handleToggle(faq.id)}
                        className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-[#141418] transition-colors hover:text-[#5B2348] sm:text-base cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B2348] dark:text-[#F4F4F6] dark:hover:text-[#E3B8D3]"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-[#5A5A66] transition-transform duration-200 dark:text-[#9E9EAB] ${
                            isOpen ? 'rotate-180 text-[#5B2348] dark:text-[#E3B8D3]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={panelId}
                        className="pb-5 pr-8 text-sm leading-relaxed text-[#4A4A55] dark:text-[#B4B4C0]"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
