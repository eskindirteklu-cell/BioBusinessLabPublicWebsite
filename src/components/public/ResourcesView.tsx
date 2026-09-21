import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, FileText, Download, CheckCircle2 } from 'lucide-react';
import { HydratedResource, Category } from '../../types/schema.ts';
import { ResourceCard } from '../ui/Cards.tsx';

interface ResourcesViewProps {
  resources: HydratedResource[];
  categories: Category[];
  onDownloadResource: (resource: HydratedResource) => Promise<void>;
  downloadingId: string | null;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  categories,
  onDownloadResource,
  downloadingId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const resourceCategories = useMemo(() => {
    return categories.filter(c => c.type === 'resource');
  }, [categories]);

  const filteredResources = useMemo(() => {
    return resources.filter(r => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.resource_type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === 'all' || r.resource_type === selectedType;

      const matchesCategory =
        selectedCategory === 'all' || r.category_id === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [resources, searchTerm, selectedType, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
          Open-Access Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] mt-2 mb-4">
          Open Resources & Venture Toolkits
        </h1>
        <p className="text-base text-[#333333]/85 leading-relaxed">
          Download market-validated entrepreneurship toolkits, spreadsheet financial models, regulatory compliance briefs, and real-world European bio-venture case studies. All materials are free to use under Creative Commons CC BY-SA 4.0.
        </p>
      </div>

      {/* Filter Bar */}
      <motion.div
        whileHover={{ y: -1, transition: { duration: 0.15 } }}
        className="bg-[#FFFBF3] border border-[#007360]/15 rounded-2xl p-5 shadow-2xs space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Search input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-[#333333]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by title, topic, toolkit name..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 cursor-pointer"
            >
              <option value="all">All Material Formats</option>
              <option value="Toolkit">Toolkit</option>
              <option value="Policy Brief">Policy Brief</option>
              <option value="Case Study">Case Study</option>
              <option value="Report">Report / Financial Model</option>
              <option value="Slide Deck">Slide Deck</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 cursor-pointer"
            >
              <option value="all">All Focus Areas</option>
              {resourceCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Stats */}
        <div className="flex items-center justify-between text-xs text-[#333333]/70 pt-2 border-t border-[#007360]/10">
          <span>
            Showing <strong>{filteredResources.length}</strong> of{' '}
            <strong>{resources.length}</strong> available downloads
          </span>
          {(searchTerm || selectedType !== 'all' || selectedCategory !== 'all') && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedCategory('all');
              }}
              className="text-[#007360] font-semibold hover:underline cursor-pointer"
            >
              Reset Filters
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Grid */}
      {filteredResources.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredResources.map(res => (
              <motion.div
                key={res.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <ResourceCard
                  resource={res}
                  onDownload={onDownloadResource}
                  isDownloading={downloadingId === res.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white border border-[#007360]/15 rounded-2xl p-8 space-y-3"
        >
          <FileText className="w-10 h-10 text-[#007360]/40 mx-auto" />
          <h3 className="text-base font-bold text-[#333333]">No matching resources found</h3>
          <p className="text-xs text-[#333333]/70 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to view all toolkits and guides.
          </p>
        </motion.div>
      )}
    </div>
  );
};
