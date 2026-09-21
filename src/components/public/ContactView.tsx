import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Building } from 'lucide-react';
import { Button } from '../ui/Buttons.tsx';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage('Please fill in all mandatory fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred while submitting your message.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
          Direct Communication Channel
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] mt-2 mb-4">
          Contact the Consortium Secretariat
        </h1>
        <p className="text-base text-[#333333]/85 leading-relaxed">
          Reach out to our project management team regarding university pilot adoption, student enrollments, or consortium research collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="bg-[#FFFBF3] border border-[#007360]/15 rounded-2xl p-7 shadow-2xs hover:shadow-md transition-shadow space-y-6"
          >
            <h2 className="text-lg font-bold text-[#333333]">
              Project Coordination Office
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#333333]/85">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#007360]/10 flex items-center justify-center text-[#007360] shrink-0 mt-0.5">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#333333]">Lead Beneficiary</div>
                  <div className="text-xs text-[#333333]/70 mt-0.5">
                    National Technical University of Athens (NTUA)
                    <br />
                    School of Chemical Engineering
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#007360]/10 flex items-center justify-center text-[#007360] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#333333]">Physical Address</div>
                  <div className="text-xs text-[#333333]/70 mt-0.5">
                    Zografou Campus, 9 Iroon Polytechniou Str., 15780 Athens, Greece
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#007360]/10 flex items-center justify-center text-[#007360] shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#333333]">Official Project Email</div>
                  <a
                    href="mailto:contact@biobusinesscatalyst.eu"
                    className="text-xs text-[#007360] font-medium hover:underline mt-0.5 block"
                  >
                    contact@biobusinesscatalyst.eu
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#007360]/10 text-xs text-[#333333]/75 space-y-1">
              <div className="font-bold text-[#007360]">Erasmus+ Project Code</div>
              <div className="font-mono text-[11px]">2023-1-EL01-KA220-HED-000159428</div>
              <div className="text-[11px] text-[#333333]/60 pt-1">
                Funded by the European Education and Culture Executive Agency (EACEA).
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Contact Form (Posts to /api/contact) */}
        <div className="lg:col-span-7">
          <motion.div
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="bg-white border-2 border-[#007360]/15 rounded-2xl p-7 sm:p-9 shadow-xs hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-bold text-[#333333] mb-2">
              Send an Inquiry to the Consortium
            </h2>
            <p className="text-xs sm:text-sm text-[#333333]/70 mb-6">
              Inquiries are persisted to our administrative secretariat and replied to within 2 business days.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-xl bg-[#38B942]/10 border border-[#38B942]/30 text-[#008C45] space-y-3"
              >
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#008C45]" />
                  Message Received Successfully
                </div>
                <p className="text-xs sm:text-sm text-[#333333]/85 leading-relaxed">
                  Thank you for reaching out to the BioBusiness Catalyst Secretariat. Your inquiry has been stored in our communications inbox, and our project manager will respond shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Inquiry
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#333333]">
                      Full Name <span className="text-[#007360]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Maria Papadopoulos"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#007360]/25 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#333333]">
                      Email Address <span className="text-[#007360]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. m.papadopoulos@univ.edu"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#007360]/25 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#333333]">
                    Subject <span className="text-[#007360]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Inquiring about Course Accreditation / ECTS points"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#007360]/25 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#333333]">
                    Message <span className="text-[#007360]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your inquiry, university affiliation, or interest in the BioBusiness Catalyst platform..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#007360]/25 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'submitting'}
                  icon={<Send className="w-4 h-4" />}
                  iconPosition="right"
                >
                  {status === 'submitting' ? 'Transmitting Message...' : 'Submit Message to Secretariat'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
