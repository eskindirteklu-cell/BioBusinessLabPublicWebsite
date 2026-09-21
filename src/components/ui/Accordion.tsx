import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  badge?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : items.length > 0 ? [items[0].id] : []
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]));
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map(item => {
        const isOpen = openIds.includes(item.id);
        return (
          <motion.div
            key={item.id}
            whileHover={{ y: -1, transition: { duration: 0.15 } }}
            className="border border-[#007360]/15 rounded-xl overflow-hidden bg-white shadow-2xs hover:shadow-xs transition-shadow"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-white hover:bg-[#FFFBF3]/60 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-[#333333] text-sm md:text-base flex items-center gap-2.5">
                {item.title}
                {item.badge && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#43AB98]/15 text-[#007360]">
                    {item.badge}
                  </span>
                )}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-[#007360]" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 text-sm text-[#333333]/85 leading-relaxed border-t border-[#007360]/10 bg-[#FFFBF3]/30">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
