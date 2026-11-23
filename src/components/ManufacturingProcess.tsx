import { MANUFACTURING_PROCESS } from '../data/catalog';

export function ManufacturingProcess() {
  return (
    <section
      id="process"
      className="border-b border-[#E4E4E9] bg-[#F8F8FA] py-16 transition-colors duration-150 sm:py-20 dark:border-[#272730] dark:bg-[#0D0D11]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#5B2348] dark:text-[#E3B8D3]">
            03. Production Workflow
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141418] [text-wrap:balance] sm:text-4xl dark:text-[#F4F4F6]">
            Five audited stages from combed cotton yarn to sealed cartons.
          </h2>
          <p className="mt-3 text-base text-[#4A4A55] dark:text-[#B4B4C0]">
            Every purchase order moves through our integrated Tiruppur pipeline with documented
            lab checkpoints before advancing to the next floor.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {MANUFACTURING_PROCESS.map((step) => (
            <li
              key={step.number}
              className="flex flex-col justify-between rounded-xl border border-[#E4E4E9] bg-white p-6 dark:border-[#272730] dark:bg-[#14141A]"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 border-b border-[#E4E4E9] pb-4 dark:border-[#272730]">
                  <span className="font-mono text-2xl font-semibold text-[#5B2348] tabular-nums dark:text-[#E3B8D3]">
                    {step.number}
                  </span>
                  <span className="font-mono text-xs text-[#5A5A66] tabular-nums dark:text-[#9E9EAB]">
                    {step.duration}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold text-[#141418] dark:text-[#F4F4F6]">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#4A4A55] dark:text-[#B4B4C0]">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#E4E4E9] pt-3.5 dark:border-[#272730]">
                <p className="text-[11px] font-semibold text-[#5A5A66] dark:text-[#9E9EAB]">
                  Quality Gate
                </p>
                <p className="mt-1 text-xs font-medium text-[#141418] dark:text-[#F4F4F6]">
                  {step.checkpoint}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
