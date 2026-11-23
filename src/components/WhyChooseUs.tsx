import { WHY_CHOOSE_US } from '../data/catalog';

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="border-b border-[#E4E4E9] bg-white py-16 transition-colors duration-150 sm:py-20 dark:border-[#272730] dark:bg-[#14141A]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#5B2348] dark:text-[#E3B8D3]">
              04. Why Brands Choose Plum &amp; Thread
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141418] [text-wrap:balance] sm:text-4xl dark:text-[#F4F4F6]">
              Direct mill economics without trading-house markups.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#4A4A55] dark:text-[#B4B4C0]">
            Built for Indian D2C apparel labels, corporate uniform programs, and export buying
            houses demanding repeatable stitch quality and GST clarity.
          </p>
        </div>

        {/* Asymmetric 12-Column Bento Layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {WHY_CHOOSE_US.map((item, idx) => {
            const colSpan = idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
            const surfaceClass =
              idx === 0
                ? 'border-[#24242B] bg-[#141418] text-white dark:border-[#3A2835] dark:bg-[#1F151C]'
                : 'border-[#E4E4E9] bg-[#F8F8FA] text-[#141418] dark:border-[#272730] dark:bg-[#191922] dark:text-[#F4F4F6]';

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between rounded-xl border p-7 sm:p-8 ${colSpan} ${surfaceClass}`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className={`font-mono text-xs font-semibold tabular-nums ${
                        idx === 0 ? 'text-[#E3B8D3]' : 'text-[#5B2348] dark:text-[#E3B8D3]'
                      }`}
                    >
                      Advantage {item.index}
                    </span>
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        idx === 0 ? 'text-white/70' : 'text-[#5A5A66] dark:text-[#9E9EAB]'
                      }`}
                    >
                      {item.metric}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p
                    className={`mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${
                      idx === 0 ? 'text-white/80' : 'text-[#4A4A55] dark:text-[#B4B4C0]'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
