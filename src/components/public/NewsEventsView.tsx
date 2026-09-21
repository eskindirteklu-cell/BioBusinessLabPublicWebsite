import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, MapPin, Clock, Tag, Share2 } from 'lucide-react';
import { HydratedNewsEvent, Category } from '../../types/schema.ts';
import { NewsCard } from '../ui/Cards.tsx';
import { Modal } from '../ui/Modal.tsx';
import { Button } from '../ui/Buttons.tsx';

interface NewsEventsViewProps {
  news: HydratedNewsEvent[];
  categories: Category[];
  selectedItem: HydratedNewsEvent | null;
  onSelectItem: (item: HydratedNewsEvent | null) => void;
}

export const NewsEventsView: React.FC<NewsEventsViewProps> = ({
  news,
  categories,
  selectedItem,
  onSelectItem,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'news' | 'events'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const newsCategories = useMemo(() => {
    return categories.filter(c => c.type === 'news');
  }, [categories]);

  const filteredItems = useMemo(() => {
    return news.filter(item => {
      const isEvent = Boolean(item.event_date);
      const matchesType =
        filterType === 'all' ||
        (filterType === 'events' && isEvent) ||
        (filterType === 'news' && !isEvent);

      const matchesCategory =
        selectedCategory === 'all' || item.category_id === selectedCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body_rich_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesType && matchesCategory && matchesSearch;
    });
  }, [news, filterType, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
          Dissemination & Community Updates
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] mt-2 mb-4">
          News, Milestones & Events
        </h1>
        <p className="text-base text-[#333333]/85 leading-relaxed">
          Stay up to date with consortium announcements, curriculum pilot launches, European bio-venture pitch showcases, and policy analysis papers.
        </p>
      </div>

      {/* Filter Bar */}
      <motion.div
        whileHover={{ y: -1, transition: { duration: 0.15 } }}
        className="bg-[#FFFBF3] border border-[#007360]/15 rounded-2xl p-5 shadow-2xs space-y-4"
      >
        {/* Type Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#007360] text-white shadow-xs'
                : 'bg-white border border-[#007360]/20 text-[#333333] hover:bg-[#007360]/10'
            }`}
          >
            All Updates ({news.length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFilterType('news')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'news'
                ? 'bg-[#007360] text-white shadow-xs'
                : 'bg-white border border-[#007360]/20 text-[#333333] hover:bg-[#007360]/10'
            }`}
          >
            Project News ({news.filter(n => !n.event_date).length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setFilterType('events')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterType === 'events'
                ? 'bg-[#007360] text-white shadow-xs'
                : 'bg-white border border-[#007360]/20 text-[#333333] hover:bg-[#007360]/10'
            }`}
          >
            Workshops & Events ({news.filter(n => Boolean(n.event_date)).length})
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2 border-t border-[#007360]/10">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-[#333333]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search news by headline, location, keyword..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 cursor-pointer"
            >
              <option value="all">All Thematic Categories</option>
              {newsCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* News Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <NewsCard item={item} onReadMore={onSelectItem} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detailed Article / Event Modal */}
      <Modal
        isOpen={Boolean(selectedItem)}
        onClose={() => onSelectItem(null)}
        title={selectedItem?.title || ''}
        subtitle={
          selectedItem?.event_date
            ? `Event Date: ${new Date(selectedItem.event_date).toLocaleDateString()} • ${selectedItem.location || 'Online'}`
            : `Published: ${selectedItem ? new Date(selectedItem.published_at).toLocaleDateString() : ''}`
        }
        maxWidth="xl"
        footer={
          <Button variant="outline" size="sm" onClick={() => onSelectItem(null)}>
            Close
          </Button>
        }
      >
        {selectedItem && (
          <div className="space-y-5">
            {/* Cover Image */}
            <div className="w-full h-64 rounded-xl overflow-hidden bg-[#FFFBF3]">
              <img
                src={selectedItem.cover_image_url}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags & Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#333333]/70 pb-3 border-b border-[#007360]/10">
              {selectedItem.category_name && (
                <span className="px-2.5 py-1 rounded-full bg-[#007360]/10 text-[#007360] font-semibold">
                  {selectedItem.category_name}
                </span>
              )}
              {selectedItem.event_date ? (
                <span className="flex items-center gap-1 font-medium text-[#007360]">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(selectedItem.event_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(selectedItem.published_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              )}
              {selectedItem.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#43AB98]" />
                  {selectedItem.location}
                </span>
              )}
            </div>

            {/* Rich Article Body */}
            <div className="text-sm text-[#333333] leading-relaxed whitespace-pre-wrap space-y-4">
              <p>{selectedItem.body_rich_text}</p>
              <p className="text-xs text-[#333333]/75 italic pt-2">
                This activity is organized within the framework of "The BioBusiness Catalyst: Empowering Entrepreneurs for a Sustainable Bioeconomy", co-funded by the Erasmus+ Programme of the European Union.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
