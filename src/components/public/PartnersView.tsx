import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, MapPin, Building, ShieldCheck } from 'lucide-react';
import { Partner } from '../../types/schema.ts';
import { PartnerCard } from '../ui/Cards.tsx';
import { Button } from '../ui/Buttons.tsx';

interface PartnersViewProps {
  partners: Partner[];
  onSelectTab: (tab: string) => void;
}

export const PartnersView: React.FC<PartnersViewProps> = ({ partners, onSelectTab }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const countries = useMemo(() => {
    const list = Array.from(new Set(partners.map(p => p.country)));
    return list.sort();
  }, [partners]);

  const filteredPartners = useMemo(() => {
    if (selectedCountry === 'all') return partners;
    return partners.filter(p => p.country === selectedCountry);
  }, [partners, selectedCountry]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
          Consortium Leadership
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] mt-2 mb-4">
          Consortium Partners & Strategic Alliances
        </h1>
        <p className="text-base text-[#333333]/85 leading-relaxed">
          The BioBusiness Catalyst brings together 6 premier European universities, national research centres, and regional innovation hubs across Greece, Italy, Finland, Spain, Belgium, and Germany.
        </p>
      </div>

      {/* Country Filter Tabs */}
      <motion.div
        whileHover={{ y: -1, transition: { duration: 0.15 } }}
        className="flex flex-wrap items-center gap-2 p-2.5 bg-[#FFFBF3] border border-[#007360]/15 rounded-xl shadow-2xs"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setSelectedCountry('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            selectedCountry === 'all'
              ? 'bg-[#007360] text-white shadow-xs'
              : 'bg-white border border-[#007360]/20 text-[#333333] hover:bg-[#007360]/10'
          }`}
        >
          All Countries ({partners.length})
        </motion.button>
        {countries.map(c => (
          <motion.button
            key={c}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedCountry(c)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedCountry === c
                ? 'bg-[#007360] text-white shadow-xs'
                : 'bg-white border border-[#007360]/20 text-[#333333] hover:bg-[#007360]/10'
            }`}
          >
            {c} ({partners.filter(p => p.country === c).length})
          </motion.button>
        ))}
      </motion.div>

      {/* Partners Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredPartners.map(partner => (
            <motion.div
              key={partner.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <PartnerCard partner={partner} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Associate Partner Call to Action */}
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="p-8 rounded-2xl bg-[#FFFBF3] border border-[#007360]/15 shadow-2xs hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-lg font-bold text-[#333333]">
            Become an Associated BioBusiness Partner
          </h3>
          <p className="text-xs sm:text-sm text-[#333333]/75 leading-relaxed">
            European clusters, regional incubators, and student societies are invited to join our Associated Partner Network to pilot specialized modules, participate in hackathons, and receive priority access to our pitch events.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => onSelectTab('contact')}
          className="shrink-0"
        >
          Submit Partnership Interest
        </Button>
      </motion.div>
    </div>
  );
};
