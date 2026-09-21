import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tags } from 'lucide-react';
import { Category } from '../../types/schema.ts';
import { Button } from '../ui/Buttons.tsx';
import { Modal } from '../ui/Modal.tsx';

interface CategoriesManagerProps {
  categories: Category[];
  onRefresh: () => Promise<void>;
}

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({
  categories,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emptyCategory: Category = {
    id: '',
    name: '',
    slug: '',
    type: 'course',
    created_at: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<Category>(emptyCategory);

  const handleOpenCreate = () => {
    setIsNew(true);
    setFormData(emptyCategory);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setIsNew(false);
    setFormData(cat);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this category? Items linked to this category may lose their categorization.'))
      return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await onRefresh();
      } else {
        alert('Failed to delete category.');
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = isNew ? '/api/admin/categories' : `/api/admin/categories/${formData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const payload = {
        ...formData,
        slug:
          formData.slug ||
          formData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
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
        alert('Failed to save category.');
      }
    } catch (err) {
      alert('Error saving category.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Thematic Categories Manager</h2>
          <p className="text-xs text-[#333333]/70 mt-1">
            Maintain taxonomy clusters used for courses, news articles, and open resources.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Taxonomy Category
        </Button>
      </div>

      <div className="bg-white border border-[#007360]/15 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFBF3] border-b border-[#007360]/15 text-[#333333] uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Category Name</th>
                <th className="px-5 py-3.5">URL Slug</th>
                <th className="px-5 py-3.5">Scope / Target Type</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007360]/10">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-[#FFFBF3]/50 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-[#333333] text-sm">
                    {cat.name}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#333333]/60">
                    {cat.slug}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        cat.type === 'course'
                          ? 'bg-[#007360]/15 text-[#007360]'
                          : cat.type === 'news'
                          ? 'bg-[#FF9F00]/15 text-[#B26B00]'
                          : 'bg-[#0057A9]/15 text-[#0057A9]'
                      }`}
                    >
                      {cat.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 rounded-md text-[#007360] hover:bg-[#007360]/10 transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isNew ? 'Create Taxonomy Category' : 'Edit Category'}
        subtitle="Specify category name and scope (courses, news, or resources)."
        maxWidth="md"
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
              {submitting ? 'Saving...' : 'Save Category'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Category Name <span className="text-[#007360]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="e.g. Bio-Refinery Technologies"
            />
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Scope / Target Entity Type <span className="text-[#007360]">*</span>
            </label>
            <select
              value={formData.type}
              onChange={e =>
                setFormData({
                  ...formData,
                  type: e.target.value as 'course' | 'news' | 'resource',
                })
              }
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
            >
              <option value="course">Course Module</option>
              <option value="news">News & Events</option>
              <option value="resource">Open Resource / Toolkit</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              URL Slug (Optional - auto-generated from title if blank)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="e.g. bio-refinery-technologies"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
