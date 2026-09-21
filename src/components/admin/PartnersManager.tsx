import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Globe } from 'lucide-react';
import { Partner } from '../../types/schema.ts';
import { Button } from '../ui/Buttons.tsx';
import { Modal } from '../ui/Modal.tsx';

interface PartnersManagerProps {
  partners: Partner[];
  onRefresh: () => Promise<void>;
}

export const PartnersManager: React.FC<PartnersManagerProps> = ({
  partners,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emptyPartner: Partner = {
    id: '',
    name: '',
    logo_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80',
    website_url: 'https://',
    country: 'Greece',
    role_description: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<Partner>(emptyPartner);

  const handleOpenCreate = () => {
    setIsNew(true);
    setFormData(emptyPartner);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Partner) => {
    setIsNew(false);
    setFormData(p);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this partner institution from the consortium list?')) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
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
      const url = isNew ? '/api/admin/partners' : `/api/admin/partners/${formData.id}`;
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
        alert('Failed to save partner.');
      }
    } catch (err) {
      alert('Error saving partner.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Consortium Partners Manager</h2>
          <p className="text-xs text-[#333333]/70 mt-1">
            Maintain institutional profiles, countries, roles, and official university portals.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Partner Institution
        </Button>
      </div>

      <div className="bg-white border border-[#007360]/15 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFBF3] border-b border-[#007360]/15 text-[#333333] uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Institution Name</th>
                <th className="px-5 py-3.5">Country</th>
                <th className="px-5 py-3.5">Role Description</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007360]/10">
              {partners.map(p => (
                <tr key={p.id} className="hover:bg-[#FFFBF3]/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-[#333333] text-sm">{p.name}</div>
                    <a
                      href={p.website_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#007360] hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      <Globe className="w-3 h-3" />
                      {p.website_url}
                    </a>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#43AB98]/15 text-[#007360] font-bold text-[11px]">
                      {p.country}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[#333333]/80 max-w-sm">
                    <p className="line-clamp-2">{p.role_description}</p>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-md text-[#007360] hover:bg-[#007360]/10 transition-colors"
                      title="Edit Partner"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Partner"
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
        title={isNew ? 'Add Partner Institution' : 'Edit Partner Profile'}
        subtitle="Manage consortium roles, country affiliations, and web addresses."
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
              {submitting ? 'Saving...' : 'Save Partner'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Institution / Organisation Name <span className="text-[#007360]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="e.g. National Technical University of Athens (NTUA)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Country <span className="text-[#007360]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
                placeholder="e.g. Greece, Italy, Finland..."
              />
            </div>

            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Website URL <span className="text-[#007360]">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.website_url}
                onChange={e => setFormData({ ...formData, website_url: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
                placeholder="https://www.ntua.gr/en"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Logo / Graphic URL
            </label>
            <input
              type="url"
              value={formData.logo_url}
              onChange={e => setFormData({ ...formData, logo_url: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
            />
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Consortium Role & Work Package Leadership <span className="text-[#007360]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.role_description}
              onChange={e => setFormData({ ...formData, role_description: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="Describe their contribution to project management, curriculum design, or dissemination..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
