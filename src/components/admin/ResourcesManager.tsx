import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Download, FileText } from 'lucide-react';
import { Resource, Category } from '../../types/schema.ts';
import { Button } from '../ui/Buttons.tsx';
import { Modal } from '../ui/Modal.tsx';

interface ResourcesManagerProps {
  resources: Resource[];
  categories: Category[];
  onRefresh: () => Promise<void>;
}

export const ResourcesManager: React.FC<ResourcesManagerProps> = ({
  resources,
  categories,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const resourceCategories = categories.filter(c => c.type === 'resource');

  const emptyResource: Resource = {
    id: '',
    title: '',
    category_id: resourceCategories[0]?.id || '',
    resource_type: 'Toolkit',
    file_url: 'https://biobusinesscatalyst.eu/downloads/toolkit.pdf',
    description: '',
    download_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<Resource>(emptyResource);

  const handleOpenCreate = () => {
    setIsNew(true);
    setFormData({ ...emptyResource, category_id: resourceCategories[0]?.id || '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (r: Resource) => {
    setIsNew(false);
    setFormData(r);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this resource from the library?')) return;
    try {
      const res = await fetch(`/api/admin/resources/${id}`, { method: 'DELETE' });
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
      const url = isNew ? '/api/admin/resources' : `/api/admin/resources/${formData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        await onRefresh();
      } else {
        alert('Failed to save resource.');
      }
    } catch (err) {
      alert('Error saving resource.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Resources & Toolkits Manager</h2>
          <p className="text-xs text-[#333333]/70 mt-1">
            Publish downloadable Excel models, policy briefs, and guidance documents.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Open Resource
        </Button>
      </div>

      <div className="bg-white border border-[#007360]/15 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFBF3] border-b border-[#007360]/15 text-[#333333] uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Title & Type</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Downloads</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007360]/10">
              {resources.map(res => {
                const category = categories.find(c => c.id === res.category_id);
                return (
                  <tr key={res.id} className="hover:bg-[#FFFBF3]/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-[#333333] text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#007360] shrink-0" />
                        <span>{res.title}</span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#007360]/10 text-[#007360] inline-block mt-1">
                        {res.resource_type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#007360] font-medium">
                      {category?.name || 'Open Knowledge'}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-[#333333]/80">
                      {res.download_count} hits
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(res)}
                        className="p-1.5 rounded-md text-[#007360] hover:bg-[#007360]/10 transition-colors"
                        title="Edit Resource"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(res.id)}
                        className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Resource"
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
        title={isNew ? 'Create New Resource' : 'Edit Resource'}
        subtitle="Manage resource type, file download target, and thematic pillar."
        maxWidth="lg"
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
              {submitting ? 'Saving...' : 'Save Resource'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Resource Title <span className="text-[#007360]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="e.g. Bio-Venture Financial Model Template (v2.1)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Category Focus <span className="text-[#007360]">*</span>
              </label>
              <select
                required
                value={formData.category_id}
                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              >
                {resourceCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Format / Type <span className="text-[#007360]">*</span>
              </label>
              <select
                value={formData.resource_type}
                onChange={e =>
                  setFormData({
                    ...formData,
                    resource_type: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              >
                <option value="Toolkit">Toolkit</option>
                <option value="Policy Brief">Policy Brief</option>
                <option value="Case Study">Case Study</option>
                <option value="Report">Report / Financial Model</option>
                <option value="Slide Deck">Slide Deck</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              File Download URL / Target <span className="text-[#007360]">*</span>
            </label>
            <input
              type="url"
              required
              value={formData.file_url}
              onChange={e => setFormData({ ...formData, file_url: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Description & Practical Utility <span className="text-[#007360]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="Explain how bioeconomy researchers and founders can apply this toolkit..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
