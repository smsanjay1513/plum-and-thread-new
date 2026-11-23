import { useEffect, useMemo, useState } from 'react';
import { ContactFooter } from './components/ContactFooter';
import { FaqSection } from './components/FaqSection';
import { HeroSection } from './components/HeroSection';
import { ManufacturingProcess } from './components/ManufacturingProcess';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { QuotationCalculator } from './components/QuotationCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import {
  calculateQuotation,
  QuotationLineItem,
  sanitizeQuantity,
} from './utils/quotation';

export type ThemeMode = 'light' | 'dark';

export default function App() {
  const [quotationItems, setQuotationItems] = useState<QuotationLineItem[]>([]);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('plum-thread-theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('plum-thread-theme', theme);
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [theme]);

  const quotationSummary = useMemo(
    () => calculateQuotation(quotationItems),
    [quotationItems]
  );

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddProduct = (productId: string, quantity = 1) => {
    const safeDelta = sanitizeQuantity(quantity);
    setQuotationItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: sanitizeQuantity(item.quantity + safeDelta) }
            : item
        );
      }
      return [...prev, { productId, quantity: safeDelta }];
    });
  };

  const handleUpdateQuantity = (productId: string, nextQuantity: number) => {
    const safeQuantity = sanitizeQuantity(nextQuantity);
    setQuotationItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: safeQuantity } : item
      )
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setQuotationItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleResetQuotation = () => {
    setQuotationItems((prev) => prev.map((item) => ({ ...item, quantity: 1 })));
  };

  const handleClearQuotation = () => {
    setQuotationItems([]);
  };

  return (
    <div
      id="app-shell"
      className="min-h-screen bg-[#F8F8FA] text-[#141418] transition-colors duration-150 dark:bg-[#0D0D11] dark:text-[#F4F4F6]"
    >
      <Navbar
        quoteItemCount={quotationSummary.totalLineItems}
        onScrollToQuotation={() => scrollToSection('quotation')}
      />

      <main>
        <HeroSection
          theme={theme}
          onChangeTheme={setTheme}
          onStartQuote={() => scrollToSection('quotation')}
          onExploreCatalog={() => scrollToSection('catalog')}
        />

        <ProductCatalog
          quotationItems={quotationItems}
          onAddProduct={(productId) => handleAddProduct(productId, 1)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveProduct={handleRemoveProduct}
          onJumpToQuotation={() => scrollToSection('quotation')}
        />

        <QuotationCalculator
          summary={quotationSummary}
          onAddProduct={handleAddProduct}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveProduct={handleRemoveProduct}
          onResetQuotation={handleResetQuotation}
          onClearQuotation={handleClearQuotation}
          onRequestProforma={() => scrollToSection('contact')}
          onExploreCatalog={() => scrollToSection('catalog')}
        />

        <ManufacturingProcess />

        <WhyChooseUs />

        <TestimonialsSection />

        <FaqSection />
      </main>

      <ContactFooter
        summary={quotationSummary}
        theme={theme}
        onChangeTheme={setTheme}
      />
    </div>
  );
}
