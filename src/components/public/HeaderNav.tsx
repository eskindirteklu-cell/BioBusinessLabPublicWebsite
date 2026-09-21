import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  Sprout,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../ui/Buttons.tsx';

interface HeaderNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  moodleUrl?: string;
  logoUrl?: string;
  siteTitle?: string;
  showSiteTitle?: boolean;
  showSiteSubtitle?: boolean;
  logoHeight?: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab,
  isAdmin,
  onToggleAdmin,
  moodleUrl = 'https://moodle.biobusinesscatalyst.eu/login',
  logoUrl,
  siteTitle = 'BioBusiness Lab',
  showSiteTitle = true,
  showSiteSubtitle = true,
  logoHeight = 36,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About the Project' },
    { id: 'lab', label: 'BioBusiness Lab' },
    { id: 'courses', label: 'Courses & Training' },
    { id: 'resources', label: 'Resources' },
    { id: 'news', label: 'News & Events' },
    { id: 'partners', label: 'Partners' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileDrawerOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#007360]/15 shadow-2xs">
      {/* Top EU Horizon/Erasmus+ Flagstrip */}
      <div className="bg-[#FFFBF3] border-b border-[#007360]/10 px-4 py-1.5 text-xs text-[#333333]/80 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[11px] truncate">
          <span className="font-bold text-[#007360] uppercase tracking-wider">
            Erasmus+ Co-funded Project
          </span>
          <span className="hidden sm:inline text-[#333333]/40">|</span>
          <span className="hidden sm:inline truncate">
            The BioBusiness Catalyst: Empowering Entrepreneurs for a Sustainable Bioeconomy
          </span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleAdmin}
            className={`text-[11px] font-semibold flex items-center gap-1.5 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
              isAdmin
                ? 'bg-[#007360] text-white shadow-xs'
                : 'bg-[#007360]/10 text-[#007360] hover:bg-[#007360]/20'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {isAdmin ? 'Exit CMS Mode' : 'Admin CMS'}
          </motion.button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo - Big and prominent, taking the space of the site title */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center select-none py-1"
        >
          {logoUrl ? (
            <div className="h-14 sm:h-18 md:h-20 flex items-center justify-start shrink-0">
              <img
                src={logoUrl}
                alt={siteTitle || 'Website Logo'}
                className="max-h-14 sm:max-h-18 md:max-h-20 max-w-[280px] sm:max-w-[380px] md:max-w-[440px] w-auto h-auto object-contain rounded drop-shadow-2xs"
                referrerPolicy="no-referrer"
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback');
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="logo-fallback hidden w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#FFFBF3] border-2 border-[#007360] items-center justify-center text-[#007360] shadow-xs">
                <Sprout className="w-7 h-7 sm:w-9 sm:h-9 text-[#007360]" />
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#FFFBF3] border-2 border-[#007360] flex items-center justify-center text-[#007360] shadow-xs shrink-0">
              <Sprout className="w-7 h-7 sm:w-9 sm:h-9 text-[#007360]" />
            </div>
          )}
        </motion.div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = currentTab === item.id && !isAdmin;
            return (
              <motion.button
                key={item.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#007360] bg-[#007360]/10 font-bold border border-[#007360]/20'
                    : 'text-[#333333] hover:text-[#007360] hover:bg-[#FFFBF3]'
                }`}
              >
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        {/* Action Button: Login / Register to Moodle */}
        <div className="hidden sm:flex items-center gap-3">
          <a href={moodleUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="primary"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Login / Register
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileDrawerOpen(true)}
            className="p-2 rounded-lg text-[#333333] hover:text-[#007360] hover:bg-[#FFFBF3] transition-colors cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-2xs"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#007360]/15">
                  <div className="flex items-center">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={siteTitle || 'Website Logo'}
                        className="max-h-12 max-w-[200px] object-contain rounded"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-[#007360]/10 flex items-center justify-center text-[#007360]">
                        <Sprout className="w-6 h-6 text-[#007360]" />
                      </div>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded-md text-[#333333]/60 hover:text-[#007360] cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="mt-6 flex flex-col gap-1.5">
                  {navItems.map(item => {
                    const isActive = currentTab === item.id && !isAdmin;
                    return (
                      <motion.button
                        key={item.id}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNavClick(item.id)}
                        className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-[#007360]/10 text-[#007360] font-bold'
                            : 'text-[#333333] hover:bg-[#FFFBF3]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <ArrowRight className="w-4 h-4 text-[#007360]" />}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-[#007360]/15 space-y-3">
                <a
                  href={moodleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={<ExternalLink className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Login / Register (Moodle)
                  </Button>
                </a>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onToggleAdmin();
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full py-2 px-4 rounded-lg border border-[#007360]/30 text-xs font-bold text-[#007360] bg-[#FFFBF3] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {isAdmin ? 'Return to Public Site' : 'Open Admin CMS'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
