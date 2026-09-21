import React from 'react';
import { Sprout, Mail, Globe, MapPin, ExternalLink } from 'lucide-react';
import { EUDisclaimerFooter } from '../ui/EUDisclaimerFooter.tsx';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  moodleUrl?: string;
  disclaimerText?: string;
  logoUrl?: string;
  siteTitle?: string;
  showSiteTitle?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  moodleUrl = 'https://moodle.biobusinesscatalyst.eu/login',
  disclaimerText,
  logoUrl,
  siteTitle = 'BioBusiness Lab',
  showSiteTitle = true,
}) => {
  return (
    <footer className="bg-[#FFFBF3] text-[#333333] border-t border-[#007360]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Project Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <div className="h-9 flex items-center justify-center">
                  <img
                    src={logoUrl}
                    alt={siteTitle || 'BioBusiness Lab'}
                    className="max-h-9 max-w-[180px] object-contain rounded"
                    referrerPolicy="no-referrer"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.footer-logo-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                  />
                  <div className="footer-logo-fallback hidden w-9 h-9 rounded-xl bg-white border-2 border-[#007360] items-center justify-center text-[#007360] shadow-2xs">
                    <Sprout className="w-5 h-5 text-[#007360]" />
                  </div>
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-white border-2 border-[#007360] flex items-center justify-center text-[#007360] shadow-2xs">
                  <Sprout className="w-5 h-5 text-[#007360]" />
                </div>
              )}
              {showSiteTitle && (
                <div>
                  <span className="font-extrabold text-xl tracking-tight text-[#007360]">
                    {siteTitle ? siteTitle.split(' ')[0] : 'BioBusiness'}
                  </span>
                  <span className="font-semibold text-xl tracking-tight text-[#333333] ml-1">
                    {siteTitle ? siteTitle.split(' ').slice(1).join(' ') : 'Lab'}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-[#333333]/80 leading-relaxed max-w-md">
              The BioBusiness Catalyst is an Erasmus+ Cooperation Partnership (Cooperation for innovation and the exchange of good practices) empowering higher education students, researchers, and entrepreneurs to lead Europe’s transition toward a circular and sustainable bioeconomy.
            </p>
            <div className="text-xs text-[#333333]/70 font-mono space-y-1">
              <div>Project Code: 2023-1-EL01-KA220-HED-000159428</div>
              <div>Lead Beneficiary: National Technical University of Athens (NTUA)</div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#007360]">
              Learning Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-[#007360] hover:underline transition-colors"
                >
                  All Accredited Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('lab')}
                  className="hover:text-[#007360] hover:underline transition-colors"
                >
                  BioBusiness Lab Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('resources')}
                  className="hover:text-[#007360] hover:underline transition-colors"
                >
                  Toolkits & Excel Models
                </button>
              </li>
              <li>
                <a
                  href={moodleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#007360] font-semibold hover:underline"
                >
                  European Moodle Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Project & Consortium */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#007360]">
              Consortium
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-[#007360] hover:underline transition-colors"
                >
                  About Project Objectives
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('partners')}
                  className="hover:text-[#007360] hover:underline transition-colors"
                >
                  Consortium Partners (6 EU)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('news')}
                  className="hover:text-[#007360] hover:underline transition-colors"
                >
                  News & Event Highlights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('faqs')}
                  className="hover:text-[#007360] hover:underline transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#007360]">
              Contact Secretariat
            </h4>
            <ul className="space-y-2.5 text-xs text-[#333333]/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#007360] shrink-0 mt-0.5" />
                <span>NTUA Campus, 9 Iroon Polytechniou Str., Athens, Greece</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#007360] shrink-0" />
                <a
                  href="mailto:contact@biobusinesscatalyst.eu"
                  className="text-[#007360] font-medium hover:underline"
                >
                  contact@biobusinesscatalyst.eu
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onSelectTab('contact')}
                  className="text-xs font-semibold text-[#007360] hover:text-[#43AB98] underline"
                >
                  Submit Institutional Inquiry Form &rarr;
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Official EU Funding Disclaimer Component (Mandatory Global Element) */}
        <EUDisclaimerFooter disclaimerText={disclaimerText} />

        {/* Copyright strip */}
        <div className="mt-6 pt-6 border-t border-[#007360]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#333333]/60">
          <p>© {new Date().getFullYear()} The BioBusiness Catalyst Consortium. Open Access under CC BY-SA 4.0.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy & Cookie Statement</span>
            <span>•</span>
            <span>Erasmus+ Quality Charter</span>
            <span>•</span>
            <span>Terms of Open Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
