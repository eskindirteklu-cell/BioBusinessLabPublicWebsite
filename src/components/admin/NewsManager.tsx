import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, MapPin, Image } from 'lucide-react';
import { NewsEvent, Category } from '../../types/schema.ts';
import { Button } from '../ui/Buttons.tsx';
import { Modal } from '../ui/Modal.tsx';

interface NewsManagerProps {
  news: NewsEvent[];
  categories: Category[];
  onRefresh: () => Promise<void>;
}

export const NewsManager: React.FC<NewsManagerProps> = ({
  news,
  categories,
  onRefresh,
}) => {
  const [editingItem, setEditingItem] = useState<NewsEvent | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const newsCategories = categories.filter(c => c.type === 'news');

  const emptyItem: NewsEvent = {
    id: '',
    title: '',
    slug: '',
    category_id: newsCategories[0]?.id || '',
    published_at: new Date().toISOString().split('T')[0],
    event_date: null,
    location: '',
    body_rich_text: '',
    cover_image_url:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<NewsEvent>(emptyItem);

  const handleOpenCreate = () => {
    setIsNew(true);
    setFormData({ ...emptyItem, category_id: newsCategories[0]?.id || '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: NewsEvent) => {
    setIsNew(false);
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this news or event announcement?')) return;
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await onRefresh();
      } else {
        alert('Failed to delete.');
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = isNew ? '/api/admin/news' : `/api/admin/news/${formData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const payload = {
        ...formData,
        slug:
          formData.slug ||
          formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
        event_date: formData.event_date || null,
        location: formData.location || null,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        await onRefresh();
      } else {
        alert('Failed to save article.');
      }
    } catch (err) {
      alert('Error saving article.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">News & Events Manager</h2>
          <p className="text-xs text-[#333333]/70 mt-1">
            Publish consortium dissemination reports, workshop agendas, and partner updates.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4" />}
        >
          Publish Article / Event
        </Button>
      </div>

      <div className="bg-white border border-[#007360]/15 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFBF3] border-b border-[#007360]/15 text-[#333333] uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Title & Type</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Date & Venue</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007360]/10">
              {news.map(item => {
                const category = categories.find(c => c.id === item.category_id);
                const isEvent = Boolean(item.event_date);
                return (
                  <tr key={item.id} className="hover:bg-[#FFFBF3]/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.cover_image_url}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover shrink-0 bg-[#FFFBF3]"
                        />
                        <div>
                          <div className="font-bold text-[#333333] text-sm line-clamp-1">
                            {item.title}
                          </div>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.2 rounded-full inline-block mt-0.5 ${
                              isEvent
                                ? 'bg-[#FF9F00]/15 text-[#B26B00]'
                                : 'bg-[#007360]/10 text-[#007360]'
                            }`}
                          >
                            {isEvent ? 'Upcoming Event' : 'Project News'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#007360] font-medium">
                      {category?.name || 'Unassigned'}
                    </td>
                    <td className="px-5 py-3.5 text-[#333333]/70">
                      <div>
                        {isEvent
                          ? `Event: ${new Date(item.event_date!).toLocaleDateString()}`
                          : `Published: ${new Date(item.published_at).toLocaleDateString()}`}
                      </div>
                      {item.location && (
                        <div className="text-[11px] text-[#43AB98] truncate max-w-[160px]">
                          {item.location}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-md text-[#007360] hover:bg-[#007360]/10 transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isNew ? 'Create News or Event Announcement' : 'Edit News Article'}
        subtitle="Manage publication dates, location tags, and rich content."
        maxWidth="xl"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Article'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Headline Title <span className="text-[#007360]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="e.g. BioBusiness Venture Pitch Contest Announced for Autumn 2026"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Category <span className="text-[#007360]">*</span>
              </label>
              <select
                required
                value={formData.category_id}
                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              >
                {newsCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Publication Date <span className="text-[#007360]">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.published_at.slice(0, 10)}
                onChange={e => setFormData({ ...formData, published_at: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Event Date (Optional - Leave blank if regular news)
              </label>
              <input
                type="date"
                value={formData.event_date ? formData.event_date.slice(0, 10) : ''}
                onChange={e =>
                  setFormData({ ...formData, event_date: e.target.value || null })
                }
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              />
            </div>

            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Location or Platform (e.g. Athens, Greece or Online / Zoom)
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
                placeholder="e.g. Brussels, Belgium / Hybrid"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Cover Image URL <span className="text-[#007360]">*</span>
            </label>
            <input
              type="url"
              required
              value={formData.cover_image_url}
              onChange={e => setFormData({ ...formData, cover_image_url: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
            />
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Article Content / Body (Markdown / Text) <span className="text-[#007360]">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={formData.body_rich_text}
              onChange={e => setFormData({ ...formData, body_rich_text: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 leading-relaxed"
              placeholder="Full article content detailing consortium updates..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
