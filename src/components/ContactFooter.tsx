import { useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Moon, Phone, Sun } from 'lucide-react';
import { ThemeMode } from '../App';
import { formatINR, QuotationSummary } from '../utils/quotation';

interface ContactFooterProps {
  summary: QuotationSummary;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
}

interface InquiryFormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  attachQuote: boolean;
}

const INITIAL_FORM: InquiryFormState = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  notes: '',
  attachQuote: true,
};

export function ContactFooter({ summary, theme, onChangeTheme }: ContactFooterProps) {
  const [form, setForm] = useState<InquiryFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormState, string>>>({});
  const [submittedRef, setSubmittedRef] = useState<string>('');

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof InquiryFormState, string>> = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (form.company.trim().length < 2) {
      nextErrors.company = 'Please enter your company or brand name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid business email address.';
    }
    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      nextErrors.phone = 'Please enter a valid 10+ digit contact number.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const reference = `PT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(reference);
  };

  return (
    <footer id="contact" className="bg-[#141418] text-white dark:bg-[#09090C]">
      {/* Pre-Footer Proforma & Sample Request Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wide text-[#E3B8D3]">
                07. Request Samples or Proforma Invoice
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
                Connect directly with our Tiruppur merchandising desk.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                Share your tech pack, GSM requirement, or attach your active quotation calculation
                to receive a formal GST proforma invoice and physical fabric swatches.
              </p>

              <dl className="mt-8 space-y-5 border-t border-white/10 pt-8 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E3B8D3]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-white">Tiruppur Mill &amp; Head Office</dt>
                    <dd className="mt-1 text-white/70">
                      Plot 42, Avinashi Road Apparel Park, Velampalayam, Tiruppur, Tamil Nadu
                      641652, India
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#E3B8D3]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-white">Merchandising Desk</dt>
                    <dd className="mt-1 font-mono text-white/70 tabular-nums">
                      +91 421 248 9040 · Mon–Sat, 9:00 AM – 6:30 PM IST
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#E3B8D3]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-white">Orders &amp; Sampling Email</dt>
                    <dd className="mt-1 text-white/70">orders@plumandthread.in</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Right Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-white/15 bg-white/5 p-6 sm:p-8">
                {submittedRef ? (
                  <div className="py-6">
                    <div className="flex items-center gap-3 text-[#E3B8D3]">
                      <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                      <span className="font-mono text-sm font-semibold tabular-nums">
                        Inquiry Reference: {submittedRef}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                      Proforma request logged with our Tiruppur desk.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      Thank you, {form.fullName}. Our merchandiser will respond to{' '}
                      <span className="font-medium text-white">{form.email}</span> within 4
                      business hours with GSM swatch options and production slot availability.
                    </p>
                    {form.attachQuote && summary.lines.length > 0 && (
                      <div className="mt-5 rounded-lg border border-white/15 bg-[#141418] p-4 text-xs text-white/80 tabular-nums">
                        Attached Quotation: {summary.totalLineItems} SKUs · {summary.totalUnits}{' '}
                        units · Grand Total {formatINR(summary.grandTotal)} (incl.{' '}
                        {formatINR(summary.totalGst)} GST)
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedRef('');
                        setForm(INITIAL_FORM);
                        setErrors({});
                      }}
                      className="mt-6 inline-flex min-h-[40px] items-center rounded-lg border border-white/25 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-white/85"
                        >
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          placeholder="Ananya Krishnan"
                          className="mt-1.5 h-11 w-full rounded-lg border border-white/20 bg-[#141418] px-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#E3B8D3] focus:outline-none"
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-xs text-rose-300">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-company"
                          className="block text-xs font-medium text-white/85"
                        >
                          Brand / Company Name *
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder="Kaveri Apparel Pvt. Ltd."
                          className="mt-1.5 h-11 w-full rounded-lg border border-white/20 bg-[#141418] px-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#E3B8D3] focus:outline-none"
                        />
                        {errors.company && (
                          <p className="mt-1 text-xs text-rose-300">{errors.company}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-white/85"
                        >
                          Work Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="procurement@company.in"
                          className="mt-1.5 h-11 w-full rounded-lg border border-white/20 bg-[#141418] px-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#E3B8D3] focus:outline-none"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-rose-300">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-medium text-white/85"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+91 98422 00112"
                          className="mt-1.5 h-11 w-full rounded-lg border border-white/20 bg-[#141418] px-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#E3B8D3] focus:outline-none"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-rose-300">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-notes"
                        className="block text-xs font-medium text-white/85"
                      >
                        Customization &amp; Delivery Notes
                      </label>
                      <textarea
                        id="contact-notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Mention Pantone shades, embroidery/print placement, size ratio, or target delivery city..."
                        className="mt-1.5 w-full rounded-lg border border-white/20 bg-[#141418] p-3.5 text-sm text-white placeholder:text-white/35 focus:border-[#E3B8D3] focus:outline-none"
                      />
                    </div>

                    {summary.lines.length > 0 && (
                      <label className="flex items-start gap-3 rounded-lg border border-white/15 bg-[#141418] p-3.5 text-xs text-white/85 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.attachQuote}
                          onChange={(e) => setForm({ ...form, attachQuote: e.target.checked })}
                          className="mt-0.5 h-4 w-4 accent-[#5B2348]"
                        />
                        <span className="tabular-nums">
                          Attach my current quotation ({summary.totalLineItems} SKUs ·{' '}
                          {summary.totalUnits} pcs · Grand Total{' '}
                          <strong className="font-mono text-white">
                            {formatINR(summary.grandTotal)}
                          </strong>
                          )
                        </span>
                      </label>
                    )}

                    <button
                      type="submit"
                      className="inline-flex min-h-[46px] w-full items-center justify-center rounded-lg bg-[#5B2348] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6E2C58] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:bg-[#7D3164] dark:hover:bg-[#913A74]"
                    >
                      Submit Proforma &amp; Swatch Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Bottom Footer Bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-xs text-white/60 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <span className="font-display text-sm font-semibold text-white">Plum &amp; Thread</span>
          <span aria-hidden="true" className="mx-2 text-white/30">
            ·
          </span>
          <span>Tiruppur Apparel Manufacturing Co. · GSTIN: 33AABCP8821K1Z4</span>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5">
          <a href="#catalog" className="hover:text-white">
            Catalog
          </a>
          <a href="#quotation" className="hover:text-white">
            Quotation
          </a>
          <a href="#process" className="hover:text-white">
            Process
          </a>
          <a href="#testimonials" className="hover:text-white">
            Testimonials
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onChangeTheme(theme === 'light' ? 'dark' : 'light')}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1 text-xs font-medium text-white/80 transition-colors hover:border-white/35 hover:text-white cursor-pointer"
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Light Mode</span>
              </>
            )}
          </button>
          <p>© {new Date().getFullYear()} Plum &amp; Thread Apparel Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  );
}
