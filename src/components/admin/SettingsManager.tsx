import React, { useState, useRef } from 'react';
import {
  Shield,
  CheckCircle2,
  Lock,
  Save,
  Sparkles,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  AlertCircle,
  Link,
  Eye,
  Trash2,
  Sprout,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SiteSettings } from '../../types/schema.ts';
import { Button } from '../ui/Buttons.tsx';

interface SettingsManagerProps {
  settings: SiteSettings;
  onRefresh: () => Promise<void>;
}

// Pre-packaged high-res vector presets for bioeconomy consortium branding
const PRESET_LOGOS = [
  {
    id: 'preset-emerald-catalyst',
    label: 'Emerald Catalyst',
    desc: 'Green leaf emblem with catalytic aura',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23007360"/><stop offset="100%" stop-color="%2343AB98"/></linearGradient></defs><rect width="120" height="120" rx="28" fill="%23FFFBF3" stroke="%23007360" stroke-width="3"/><circle cx="60" cy="60" r="38" fill="none" stroke="%2343AB98" stroke-width="3" stroke-dasharray="6 4"/><path d="M60 28 C74 28 84 40 84 56 C84 76 60 92 60 92 C60 92 36 76 36 56 C36 40 46 28 60 28 Z" fill="url(%23g1)"/><path d="M60 42 C60 42 66 56 60 74 C54 56 60 42 60 42 Z" fill="%23FFFBF3"/><circle cx="60" cy="46" r="4" fill="%23EBB036"/></svg>',
  },
  {
    id: 'preset-circular-bio',
    label: 'Circular Bioeconomy',
    desc: 'Continuous dual-arrow sustainability loop',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23008C45"/><stop offset="100%" stop-color="%23EBB036"/></linearGradient></defs><rect width="120" height="120" rx="28" fill="%23007360"/><path d="M40 36 A26 26 0 1 1 80 84" fill="none" stroke="%23FFFBF3" stroke-width="8" stroke-linecap="round"/><path d="M80 84 A26 26 0 1 1 40 36" fill="none" stroke="%23EBB036" stroke-width="8" stroke-linecap="round"/><polygon points="36,26 48,36 34,44" fill="%23FFFBF3"/><polygon points="84,94 72,84 86,76" fill="%23EBB036"/></svg>',
  },
  {
    id: 'preset-biotech-helix',
    label: 'BioTech DNA Helix',
    desc: 'European innovation & life sciences strand',
    dataUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230057A9"/><stop offset="100%" stop-color="%23007360"/></linearGradient></defs><rect width="120" height="120" rx="28" fill="%23FFFFFF" stroke="%230057A9" stroke-width="2.5"/><path d="M38 34 Q60 60 38 86" fill="none" stroke="%23007360" stroke-width="6" stroke-linecap="round"/><path d="M82 34 Q60 60 82 86" fill="none" stroke="%230057A9" stroke-width="6" stroke-linecap="round"/><line x1="42" y1="44" x2="78" y2="44" stroke="%2343AB98" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="60" x2="70" y2="60" stroke="%23EBB036" stroke-width="4" stroke-linecap="round"/><line x1="42" y1="76" x2="78" y2="76" stroke="%2343AB98" stroke-width="3" stroke-linecap="round"/></svg>',
  },
];

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  settings,
  onRefresh,
}) => {
  const [formData, setFormData] = useState<SiteSettings>({
    ...settings,
  });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [logoSaving, setLogoSaving] = useState(false);
  const [logoSuccess, setLogoSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setFormData({
      ...settings,
    });
  }, [settings]);

  const handleProcessFile = (file: File) => {
    setUploadError(null);

    // Validate mime type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid image format. Please upload PNG, SVG, JPG, or WebP.');
      return;
    }

    // Validate size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File exceeds 5MB size limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      if (result) {
        setFormData(prev => ({ ...prev, logo_url: result }));
        setFileDetails({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
        });
      }
    };
    reader.onerror = () => {
      setUploadError('Could not read file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleSaveLogoDirectly = async () => {
    setLogoSaving(true);
    setLogoSuccess(false);
    setUploadError(null);

    try {
      const res = await fetch('/api/admin/upload-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          logo_data: formData.logo_url || '',
        }),
      });

      if (res.ok) {
        setLogoSuccess(true);
        await onRefresh();
        setTimeout(() => setLogoSuccess(false), 3500);
      } else {
        const data = await res.json().catch(() => ({}));
        setUploadError(data.error || 'Failed to save logo.');
      }
    } catch (err) {
      setUploadError('Network error saving logo.');
    } finally {
      setLogoSaving(false);
    }
  };

  const handleResetToDefault = () => {
    setFormData(prev => ({
      ...prev,
      logo_url: '',
    }));
    setFileDetails(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectPreset = (dataUrl: string, label: string) => {
    setFormData(prev => ({ ...prev, logo_url: dataUrl }));
    setFileDetails({ name: `${label} (Vector Preset)`, size: 'SVG' });
    setUploadError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSavedSuccess(true);
        await onRefresh();
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert('Failed to update site settings.');
      }
    } catch (err) {
      alert('Network error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-[#333333]">Global Site & Platform Settings</h2>
        <p className="text-xs text-[#333333]/70 mt-1">
          Configure site brand logo, external Moodle LMS redirection endpoints, and EU legal compliance.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-[#38B942]/15 border border-[#38B942]/30 text-[#008C45] flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          Settings successfully updated across the public application.
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* SECTION 1: WEBSITE LOGO & BRANDING (CMS MANAGEMENT) */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white border border-[#007360]/15 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#007360]/10 pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#007360]" />
              Website Logo & Visual Branding
            </h3>
            <p className="text-[11px] text-[#333333]/70 mt-0.5">
              Upload an official consortium logo (PNG, SVG, JPG, WebP) to display in the header, navigation drawer, and footer.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {formData.logo_url && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleResetToDefault}
                className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Revert to default BioBusiness Lab vector emblem"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to Default
              </motion.button>
            )}

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleSaveLogoDirectly}
              disabled={logoSaving}
              icon={logoSuccess ? <Check className="w-3.5 h-3.5 text-[#008C45]" /> : <Save className="w-3.5 h-3.5 text-[#007360]" />}
            >
              {logoSaving ? 'Saving Logo...' : logoSuccess ? 'Logo Saved!' : 'Save Logo Now'}
            </Button>
          </div>
        </div>

        {logoSuccess && (
          <div className="p-3.5 rounded-xl bg-[#38B942]/15 border border-[#38B942]/30 text-[#008C45] flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Website logo updated! The new logo is now active across all public views and the CMS top navigation.
          </div>
        )}

        {uploadError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs font-semibold animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {uploadError}
          </div>
        )}

        {/* Input Mode Selector: Upload File vs Enter URL */}
        <div className="flex items-center gap-2 border-b border-[#007360]/10 pb-3">
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              inputMode === 'upload'
                ? 'bg-[#007360] text-white shadow-2xs'
                : 'text-[#333333]/70 hover:text-[#007360] hover:bg-[#007360]/5'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Image File
          </button>
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              inputMode === 'url'
                ? 'bg-[#007360] text-white shadow-2xs'
                : 'text-[#333333]/70 hover:text-[#007360] hover:bg-[#007360]/5'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            Image URL / Web Link
          </button>
        </div>

        {/* Upload Mode 1: Drag & Drop Zone */}
        {inputMode === 'upload' && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 select-none ${
              isDragging
                ? 'border-[#007360] bg-[#007360]/10 scale-[1.01]'
                : 'border-[#007360]/25 bg-[#FFFBF3]/50 hover:bg-[#FFFBF3] hover:border-[#007360]/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp, image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-12 h-12 rounded-full bg-[#007360]/10 text-[#007360] flex items-center justify-center shadow-2xs">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#333333]">
                Click to browse or drag and drop your logo file
              </p>
              <p className="text-[11px] text-[#333333]/60 mt-1">
                Supports SVG (recommended), PNG, JPG, or WebP up to 5MB. Transparent backgrounds work best.
              </p>
            </div>
            {fileDetails && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007360]/10 text-[#007360] text-xs font-semibold">
                <Check className="w-3 h-3" />
                <span>Selected: {fileDetails.name} ({fileDetails.size})</span>
              </div>
            )}
          </div>
        )}

        {/* Upload Mode 2: Web Image URL Input */}
        {inputMode === 'url' && (
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#333333]">
              Direct Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.org/consortium-logo.png"
                value={formData.logo_url || ''}
                onChange={e => {
                  setFormData(prev => ({ ...prev, logo_url: e.target.value }));
                  setFileDetails(e.target.value ? { name: 'External Web Image', size: 'URL' } : null);
                }}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              />
              {formData.logo_url && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, logo_url: '' }))}
                  className="px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#333333]/60">
              Paste any publicly accessible HTTPS link to your logo file.
            </p>
          </div>
        )}

        {/* Curated Consortium Sample Presets */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-[#333333] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#007360]" />
            Or choose a Consortium Logo Preset:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRESET_LOGOS.map(preset => {
              const isSelected = formData.logo_url === preset.dataUrl;
              return (
                <motion.button
                  key={preset.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleSelectPreset(preset.dataUrl, preset.label)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#007360] bg-[#007360]/10 ring-2 ring-[#007360]/30'
                      : 'border-[#007360]/15 bg-white hover:border-[#007360]/40 hover:bg-[#FFFBF3]/60'
                  }`}
                >
                  <img
                    src={preset.dataUrl}
                    alt={preset.label}
                    className="w-10 h-10 object-contain rounded-lg p-1 bg-white border border-[#007360]/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#333333] truncate flex items-center gap-1">
                      {preset.label}
                      {isSelected && <Check className="w-3 h-3 text-[#007360] shrink-0" />}
                    </div>
                    <div className="text-[10px] text-[#333333]/60 truncate mt-0.5">
                      {preset.desc}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Live Simulation Previews */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#333333] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#007360]" />
              Navbar Live Preview
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-[#007360] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {formData.logo_url ? 'Custom Brand Logo Active' : 'Default Emblem Active'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Header Navigation Bar Simulation */}
            <div className="border border-[#007360]/15 rounded-xl p-4 bg-white shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#333333]/70 uppercase tracking-wider">
                <span>Public Navbar Header</span>
                <span className="text-[10px] text-[#007360] font-medium">Large Brand Space</span>
              </div>
              <div className="px-4 bg-white rounded-lg border border-[#007360]/10 flex items-center justify-between transition-all min-h-[5.5rem]">
                <div className="flex items-center">
                  {formData.logo_url ? (
                    <img
                      src={formData.logo_url}
                      alt="Logo Preview"
                      className="max-h-16 max-w-[240px] sm:max-w-[320px] object-contain rounded drop-shadow-2xs"
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        const el = e.currentTarget.parentElement?.querySelector('.preview-fallback');
                        if (el) (el as HTMLElement).style.display = 'flex';
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-[#FFFBF3] border-2 border-[#007360] flex items-center justify-center text-[#007360]">
                      <Sprout className="w-8 h-8 text-[#007360]" />
                    </div>
                  )}
                  <div className="preview-fallback hidden w-14 h-14 rounded-2xl bg-[#FFFBF3] border-2 border-[#007360] items-center justify-center text-[#007360]">
                    <Sprout className="w-8 h-8 text-[#007360]" />
                  </div>
                </div>
                <div className="hidden sm:flex gap-1.5 items-center">
                  <span className="px-2.5 py-1 rounded-md bg-[#007360]/10 text-[#007360] text-[11px] font-bold">Home</span>
                  <span className="px-2.5 py-1 rounded-md text-[#333333]/60 text-[11px]">BioBusiness Lab</span>
                  <span className="px-2.5 py-1 rounded-md text-[#333333]/60 text-[11px]">Courses</span>
                </div>
              </div>
            </div>

            {/* Contrast / Dark Background Check */}
            <div className="border border-[#007360]/15 rounded-xl p-4 bg-[#1E293B] shadow-2xs space-y-2 text-white">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Dark Background / Contrast Check
              </div>
              <div className="px-4 bg-slate-900/80 rounded-lg border border-slate-700 flex items-center justify-center transition-all min-h-[5.5rem]">
                {formData.logo_url ? (
                  <img
                    src={formData.logo_url}
                    alt="Dark Preview"
                    className="max-h-16 max-w-[240px] sm:max-w-[320px] object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <Sprout className="w-6 h-6" />
                    <span className="text-xs font-bold text-white">Default Vector Emblem</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: PLATFORM IDENTITY & LMS CONFIGURATION */}
      {/* ---------------------------------------------------- */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-[#007360]/15 rounded-xl p-6 sm:p-8 shadow-2xs">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#333333] border-b border-[#007360]/10 pb-2">
            General Platform Identity & Endpoints
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#333333] mb-1">
                Public Site Title
              </label>
              <input
                type="text"
                required
                value={formData.site_title}
                onChange={e => setFormData({ ...formData, site_title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#333333] mb-1">
                Consortium Contact Email
              </label>
              <input
                type="email"
                required
                value={formData.contact_email}
                onChange={e => setFormData({ ...formData, contact_email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#333333] mb-1">
              European Moodle LMS Direct Login / SSO URL
            </label>
            <input
              type="url"
              required
              value={formData.moodle_login_url}
              onChange={e =>
                setFormData({ ...formData, moodle_login_url: e.target.value })
              }
              className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
            />
            <p className="text-[11px] text-[#333333]/60 mt-1">
              This endpoint is triggered whenever users click "Login / Register" in the top navigation or course enrollment cards.
            </p>
          </div>
        </div>

        {/* AI Assistant Feature Toggle */}
        <div className="space-y-4 pt-4 border-t border-[#007360]/10">
          <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#007360]" />
            AI Learning Assistant Integration
          </h3>

          <div className="flex items-center justify-between p-4 bg-[#FFFBF3] rounded-xl border border-[#007360]/15">
            <div>
              <div className="font-bold text-xs text-[#333333]">
                Enable Floating AI Assistant Widget
              </div>
              <p className="text-[11px] text-[#333333]/70 mt-0.5">
                Renders the interactive AI learning tutor in the bottom-right corner of public views.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.ai_widget_enabled}
                onChange={e =>
                  setFormData({ ...formData, ai_widget_enabled: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007360]"></div>
            </label>
          </div>
        </div>

        {/* Protected / Read-Only EU Funding Disclaimer Box */}
        <div className="space-y-4 pt-4 border-t border-[#007360]/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#333333] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#007360]" />
              EU Erasmus+ Statutory Funding Disclaimer
            </h3>
            <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#0057A9]/10 text-[#0057A9]">
              <Lock className="w-3 h-3" /> Protected Field (Read-Only)
            </span>
          </div>

          <div className="p-4 bg-[#0057A9]/5 border border-[#0057A9]/20 rounded-xl space-y-2">
            <p className="text-[11px] text-[#0057A9] font-medium leading-relaxed">
              <strong>Statutory Legal Governance Notice:</strong> In accordance with the Erasmus+ Grant Agreement (Ref: 2023-1-EL01-KA220-HED-000159428) and EACEA visual identity guidelines, this disclaimer text and the European flag emblem are legally protected against unauthorized modification or deletion.
            </p>
            <textarea
              readOnly
              rows={4}
              value={formData.eu_disclaimer_text}
              className="w-full p-3 bg-white/80 border border-[#0057A9]/20 rounded-lg text-xs text-[#333333]/90 font-mono leading-relaxed cursor-not-allowed select-all"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={saving}
            icon={<Save className="w-4 h-4" />}
          >
            {saving ? 'Persisting Configuration...' : 'Save Site Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
};
