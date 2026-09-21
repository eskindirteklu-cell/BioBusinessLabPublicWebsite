import React, { useState } from 'react';
import { Mail, CheckCircle2, Clock, Trash2, Eye } from 'lucide-react';
import { ContactMessage } from '../../types/schema.ts';
import { Button } from '../ui/Buttons.tsx';
import { Modal } from '../ui/Modal.tsx';

interface MessagesManagerProps {
  messages: ContactMessage[];
  onRefresh: () => Promise<void>;
}

export const MessagesManager: React.FC<MessagesManagerProps> = ({
  messages,
  onRefresh,
}) => {
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  const handleToggleResolved = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_resolved: !currentStatus }),
      });
      if (res.ok) {
        await onRefresh();
        if (selectedMsg && selectedMsg.id === id) {
          setSelectedMsg(prev => (prev ? { ...prev, is_resolved: !currentStatus } : null));
        }
      } else {
        alert('Failed to update status.');
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSelectedMsg(null);
        await onRefresh();
      } else {
        alert('Failed to delete message.');
      }
    } catch (e) {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#333333]">Contact Messages & Inquiries</h2>
        <p className="text-xs text-[#333333]/70 mt-1">
          Review inquiries submitted via the public contact portal and track resolution states.
        </p>
      </div>

      <div className="bg-white border border-[#007360]/15 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFBF3] border-b border-[#007360]/15 text-[#333333] uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Sender</th>
                <th className="px-5 py-3.5">Subject & Preview</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007360]/10">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[#333333]/60">
                    No messages received yet.
                  </td>
                </tr>
              ) : (
                messages.map(msg => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-[#FFFBF3]/50 transition-colors ${
                      !msg.is_resolved ? 'bg-[#007360]/2' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      {msg.is_resolved ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#38B942]/15 text-[#008C45]">
                          <CheckCircle2 className="w-3 h-3" /> Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FF9F00]/15 text-[#B26B00]">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-[#333333]">{msg.name}</div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-[11px] text-[#007360] hover:underline truncate block"
                      >
                        {msg.email}
                      </a>
                    </td>
                    <td className="px-5 py-3.5 max-w-xs">
                      <div className="font-bold text-[#333333] truncate">{msg.subject}</div>
                      <div className="text-[11px] text-[#333333]/60 truncate mt-0.5">
                        {msg.message}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#333333]/70 font-mono text-[11px]">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => setSelectedMsg(msg)}
                        className="p-1.5 rounded-md text-[#007360] hover:bg-[#007360]/10 transition-colors"
                        title="View Full Inquiry"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleResolved(msg.id, Boolean(msg.is_resolved))}
                        className="p-1.5 rounded-md text-[#333333]/70 hover:text-[#007360] hover:bg-[#007360]/10 transition-colors"
                        title={msg.is_resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Inspection Modal */}
      <Modal
        isOpen={Boolean(selectedMsg)}
        onClose={() => setSelectedMsg(null)}
        title={selectedMsg?.subject || 'Message Details'}
        subtitle={`From: ${selectedMsg?.name} (${selectedMsg?.email})`}
        maxWidth="md"
        footer={
          <>
            {selectedMsg && (
              <Button
                variant={selectedMsg.is_resolved ? 'secondary' : 'primary'}
                size="sm"
                onClick={() =>
                  handleToggleResolved(selectedMsg.id, Boolean(selectedMsg.is_resolved))
                }
              >
                {selectedMsg.is_resolved ? 'Mark as Pending' : 'Mark as Resolved'}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMsg(null)}
            >
              Close
            </Button>
          </>
        }
      >
        {selectedMsg && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#FFFBF3] rounded-lg border border-[#007360]/15 space-y-1">
              <div>
                <span className="font-bold text-[#333333]">Date Received:</span>{' '}
                {new Date(selectedMsg.created_at).toLocaleString()}
              </div>
              <div>
                <span className="font-bold text-[#333333]">Email Sender:</span>{' '}
                <a
                  href={`mailto:${selectedMsg.email}`}
                  className="text-[#007360] underline"
                >
                  {selectedMsg.email}
                </a>
              </div>
              <div>
                <span className="font-bold text-[#333333]">Resolution State:</span>{' '}
                <span className="font-semibold">
                  {selectedMsg.is_resolved ? 'Resolved' : 'Pending Action'}
                </span>
              </div>
            </div>

            <div>
              <label className="font-bold text-[#333333] block mb-1">
                Full Inquiry Text:
              </label>
              <div className="p-4 bg-white border border-[#007360]/20 rounded-lg text-sm text-[#333333] leading-relaxed whitespace-pre-wrap">
                {selectedMsg.message}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
