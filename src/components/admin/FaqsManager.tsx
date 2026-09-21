import React, { useState } from 'react';
import { Plus, Edit2, Trash2, HelpCircle } from 'lucide-react';
import { Faq } from '../../types/schema.ts';
import { Button } from '../ui/Buttons.tsx';
import { Modal } from '../ui/Modal.tsx';

interface FaqsManagerProps {
  faqs: Faq[];
  onRefresh: () => Promise<void>;
}

export const FaqsManager: React.FC<FaqsManagerProps> = ({ faqs, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emptyFaq: Faq = {
    id: '',
    question: '',
    answer: '',
    category: 'General & Participation',
    sort_order: (faqs.length + 1) * 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<Faq>(emptyFaq);

  const handleOpenCreate = () => {
    setIsNew(true);
    setFormData(emptyFaq);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: Faq) => {
    setIsNew(false);
    setFormData(f);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this FAQ question?')) return;
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await onRefresh();
      } else {
        alert('Failed to delete FAQ.');
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = isNew ? '/api/admin/faqs' : `/api/admin/faqs/${formData.id}`;
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
        alert('Failed to save FAQ.');
      }
    } catch (err) {
      alert('Error saving FAQ.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Frequently Asked Questions Manager</h2>
          <p className="text-xs text-[#333333]/70 mt-1">
            Maintain learner questions, accreditation guidelines, and Moodle platform FAQs.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4" />}
        >
          Add FAQ Item
        </Button>
      </div>

      <div className="bg-white border border-[#007360]/15 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFBF3] border-b border-[#007360]/15 text-[#333333] uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Order</th>
                <th className="px-5 py-3.5">Question & Answer</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007360]/10">
              {faqs.map(f => (
                <tr key={f.id} className="hover:bg-[#FFFBF3]/50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-[11px] text-[#333333]/60">
                    {f.sort_order}
                  </td>
                  <td className="px-5 py-3.5 max-w-md">
                    <div className="font-bold text-[#333333] text-sm">{f.question}</div>
                    <div className="text-[11px] text-[#333333]/70 line-clamp-2 mt-1">
                      {f.answer}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#007360]/10 text-[#007360] font-semibold text-[11px]">
                      {f.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(f)}
                      className="p-1.5 rounded-md text-[#007360] hover:bg-[#007360]/10 transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete FAQ"
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
        title={isNew ? 'Create FAQ Item' : 'Edit FAQ Item'}
        subtitle="Manage question formulation, answer text, and order."
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
              {submitting ? 'Saving...' : 'Save FAQ'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Question <span className="text-[#007360]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={e => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="e.g. How do I earn verifiable ECTS credits?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Category Group <span className="text-[#007360]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
                placeholder="e.g. Platform & Moodle Access"
              />
            </div>

            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Display Sort Order
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={e =>
                  setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Detailed Answer <span className="text-[#007360]">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={formData.answer}
              onChange={e => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 leading-relaxed"
              placeholder="Provide a clear, accurate, and comprehensive explanation..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
