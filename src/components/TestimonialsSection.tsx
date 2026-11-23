import { TESTIMONIALS } from '../data/catalog';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-b border-[#E4E4E9] bg-[#F8F8FA] py-16 transition-colors duration-150 sm:py-20 dark:border-[#272730] dark:bg-[#0D0D11]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#5B2348] dark:text-[#E3B8D3]">
              05. Customer Testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-[#141418] [text-wrap:balance] sm:text-4xl dark:text-[#F4F4F6]"
            >
              Trusted by procurement leads and apparel founders across India.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#4A4A55] dark:text-[#B4B4C0]">
            Real delivery outcomes from D2C apparel labels, corporate uniform programs, and babywear
            brands manufacturing on our Tiruppur floor.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-[#E4E4E9] bg-white p-6 sm:p-7 dark:border-[#272730] dark:bg-[#14141A]"
            >
              <div>
                <p className="font-mono text-xs font-semibold text-[#5B2348] dark:text-[#E3B8D3]">
                  {item.outcome}
                </p>
                <blockquote className="mt-4 text-sm leading-relaxed text-[#2C2C35] sm:text-base dark:text-[#D4D4DF]">
                  “{item.quote}”
                </blockquote>
              </div>

              <figcaption className="mt-6 border-t border-[#E4E4E9] pt-4 dark:border-[#272730]">
                <p className="font-display text-sm font-semibold text-[#141418] dark:text-[#F4F4F6]">
                  {item.author}
                </p>
                <p className="mt-0.5 text-xs text-[#5A5A66] dark:text-[#9E9EAB]">
                  {item.role} · {item.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
