import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Search } from 'lucide-react';
import { Faq } from '../../types/schema.ts';
import { Accordion, AccordionItem } from '../ui/Accordion.tsx';

interface FaqsViewProps {
  faqs: Faq[];
  onSelectTab: (tab: string) => void;
}

export const FaqsView: React.FC<FaqsViewProps> = ({ faqs, onSelectTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    return Array.from(new Set(faqs.map(f => f.category)));
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(f => {
      const matchesCategory =
        selectedCategory === 'all' || f.category === selectedCategory;
      const matchesSearch =
        f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, selectedCategory, searchTerm]);

  const accordionItems: AccordionItem[] = filteredFaqs.map(f => ({
    id: f.id,
    title: f.question,
    badge: f.category,
    content: (
      <div className="space-y-3">
        <p className="text-xs sm:text-sm leading-relaxed">{f.answer}</p>
      </div>
    ),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
          Guidance & Clear Answers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] mt-2 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-[#333333]/85 leading-relaxed">
          Find answers about Erasmus+ learner eligibility, European ECTS credit recognition, Moodle account setup, and open-access licensing.
        </p>
      </div>

      {/* Category Tabs & Search */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#007360] text-white shadow-xs'
                : 'bg-[#FFFBF3] border border-[#007360]/20 text-[#333333] hover:bg-[#007360]/10'
            }`}
          >
            All Questions ({faqs.length})
          </motion.button>
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#007360] text-white shadow-xs'
                  : 'bg-[#FFFBF3] border border-[#007360]/20 text-[#333333] hover:bg-[#007360]/10'
              }`}
            >
              {cat} ({faqs.filter(f => f.category === cat).length})
            </motion.button>
          ))}
        </div>

        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#333333]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search FAQs by question or keyword..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 transition-all"
          />
        </div>
      </div>

      {/* Accordion Component */}
      {accordionItems.length > 0 ? (
        <Accordion items={accordionItems} allowMultiple={false} />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-[#FFFBF3] rounded-xl border border-[#007360]/15 p-6 space-y-2"
        >
          <HelpCircle className="w-8 h-8 text-[#007360]/50 mx-auto" />
          <h3 className="text-sm font-bold text-[#333333]">No questions found</h3>
          <p className="text-xs text-[#333333]/70">
            Try a different search term or check all categories.
          </p>
        </motion.div>
      )}

      {/* Still need help callout */}
      <div className="text-center pt-8 border-t border-[#007360]/15">
        <p className="text-xs text-[#333333]/75">
          Have a question not addressed in our FAQ list?{' '}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTab('contact')}
            className="text-[#007360] font-bold underline hover:text-[#43AB98] cursor-pointer"
          >
            Contact the Consortium Secretariat directly &rarr;
          </motion.button>
        </p>
      </div>
    </div>
  );
};
