import React from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle2, Flag, Award, Calendar, ExternalLink } from 'lucide-react';
import { Partner } from '../../types/schema.ts';
import { PartnerCard } from '../ui/Cards.tsx';

interface AboutViewProps {
  partners: Partner[];
  onSelectTab: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ partners, onSelectTab }) => {
  const objectives = [
    {
      title: 'Co-Design Accredited Curricula',
      desc: 'Formulate 12 multidisciplinary modules addressing biotechnology entrepreneurship, bio-refinery engineering, and European environmental law.',
    },
    {
      title: 'Deploy Digital Open Learning Lab',
      desc: 'Deliver a cloud-hosted, mobile-first learning ecosystem pairing Moodle with AI tutoring to support 1,500+ European learners.',
    },
    {
      title: 'Foster Bio-Venture Incubation',
      desc: 'Equip aspiring founders with actionable feasibility spreadsheets, financial forecast templates, and IP protection roadmaps.',
    },
    {
      title: 'Strengthen European Bioeconomy Alliances',
      desc: 'Connect universities in southern, central, and northern Europe with industrial clusters, technology transfer offices, and venture capital.',
    },
  ];

  const milestones = [
    {
      period: 'Q4 2023 - Q1 2024',
      title: 'Consortium Kickoff & Needs Assessment',
      status: 'Completed',
      desc: 'Survey of 120+ bio-based enterprises and 25 university faculties to map critical skills shortages in circular bioeconomy ventures.',
    },
    {
      period: 'Q2 2024 - Q4 2024',
      title: 'Curriculum & Toolkit Co-Creation',
      status: 'Completed',
      desc: 'Drafting of 12 modular courses, validation of techno-economic templates, and development of the digital BioBusiness Lab platform.',
    },
    {
      period: 'Q1 2025 - Q3 2025',
      title: 'Pilot Deployment & Moodle Integration',
      status: 'Completed',
      desc: 'Rollout of initial pilot cohorts across 4 partner universities with over 400 student evaluations and ECTS integration testing.',
    },
    {
      period: '2026 - Ongoing',
      title: 'Pan-European Scaling & Venture Showcase',
      status: 'Active',
      desc: 'Public dissemination of all open-access resources, deployment of AI Learning Assistant, and European Venture Pitch Showcase.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header / Intro */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
          Erasmus+ Strategic Cooperation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] mt-2 mb-4">
          About the BioBusiness Catalyst Project
        </h1>
        <p className="text-base text-[#333333]/85 leading-relaxed">
          The European bioeconomy encompasses all sectors relying on biological resources (plants, animals, microorganisms, and biomass). While Europe leads in scientific discoveries, commercialization remains a major bottleneck. The <strong>BioBusiness Catalyst</strong> was founded to bridge this valley of death by providing the educational, strategic, and financial tools required to transform lab breakthroughs into thriving circular businesses.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
          className="p-8 rounded-2xl bg-white border border-[#007360]/15 shadow-2xs hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-[#007360]/10 flex items-center justify-center text-[#007360] mb-5">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#333333] mb-3">Our Core Vision</h2>
          <p className="text-xs sm:text-sm text-[#333333]/80 leading-relaxed">
            To build an open, accessible pan-European pipeline for sustainable biotechnology entrepreneurship. We envision a Europe where academic researchers and young founders have the commercial acumen, regulatory clarity, and network access to establish carbon-negative, zero-waste bio-ventures.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
          className="p-8 rounded-2xl bg-[#FFFBF3] border border-[#007360]/15 shadow-2xs hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-[#43AB98]/20 flex items-center justify-center text-[#007360] mb-5">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#333333] mb-3">Erasmus+ Framework</h2>
          <p className="text-xs sm:text-sm text-[#333333]/80 leading-relaxed">
            Funded under the Erasmus+ Programme (Key Action 2: Cooperation Partnerships in Higher Education), Project Ref <strong>2023-1-EL01-KA220-HED-000159428</strong>. All project deliverables, courses, and toolkits are strictly open-access under Creative Commons licensing.
          </p>
        </motion.div>
      </div>

      {/* Strategic Objectives */}
      <div>
        <div className="mb-8">
          <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
            Key Deliverables
          </span>
          <h2 className="text-2xl font-bold text-[#333333] mt-1">
            Core Project Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, transition: { duration: 0.15, ease: 'easeOut' } }}
              className="p-6 rounded-xl bg-white border border-[#007360]/15 shadow-2xs hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-[#007360]/10 text-[#007360] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#333333] mb-1.5">{obj.title}</h3>
                <p className="text-xs text-[#333333]/75 leading-relaxed">{obj.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Timeline Milestones */}
      <div>
        <div className="mb-8">
          <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
            Implementation Roadmap
          </span>
          <h2 className="text-2xl font-bold text-[#333333] mt-1">
            Project Milestones & Timeline
          </h2>
        </div>

        <div className="space-y-4">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 4, transition: { duration: 0.15, ease: 'easeOut' } }}
              className="p-5 rounded-xl bg-white border border-[#007360]/15 shadow-2xs hover:shadow-sm transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-[#007360] bg-[#007360]/10 px-2 py-0.5 rounded">
                    {m.period}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      m.status === 'Completed'
                        ? 'bg-[#38B942]/15 text-[#008C45]'
                        : 'bg-[#FF9F00]/15 text-[#B26B00]'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#333333]">{m.title}</h3>
                <p className="text-xs text-[#333333]/75">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partner Consortium Grid Preview */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
              Consortium Members
            </span>
            <h2 className="text-2xl font-bold text-[#333333] mt-1">
              6 European Partner Institutions
            </h2>
          </div>
          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTab('partners')}
            className="text-xs font-bold text-[#007360] hover:text-[#43AB98] transition-colors cursor-pointer"
          >
            View Full Partner Profiles &rarr;
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.slice(0, 3).map(p => (
            <PartnerCard key={p.id} partner={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
