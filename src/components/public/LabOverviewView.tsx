import React from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Compass,
  Sliders,
  Award,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Users,
} from 'lucide-react';
import { Button } from '../ui/Buttons.tsx';

interface LabOverviewViewProps {
  onSelectTab: (tab: string) => void;
  moodleUrl?: string;
}

export const LabOverviewView: React.FC<LabOverviewViewProps> = ({
  onSelectTab,
  moodleUrl = 'https://moodle.biobusinesscatalyst.eu/login',
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Overview Intro */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
          Digital Learning Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] mt-2 mb-4">
          BioBusiness Lab: The Next-Gen E-Learning Hub
        </h1>
        <p className="text-base text-[#333333]/85 leading-relaxed">
          The <strong>BioBusiness Lab</strong> is a state-of-the-art digital environment tailored for aspiring green tech founders, researchers, and university students. By pairing the robust European Moodle LMS infrastructure with modern AI-assisted adaptive learning, it provides a flexible, self-paced, and collaborative pathway toward bioeconomy commercialization.
        </p>
      </div>

      {/* 3 Core Feature Cards: AI Learning Assistant, Personalized Learning, Adaptive Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 1. AI Learning Assistant */}
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
          className="bg-white border-2 border-[#007360]/20 rounded-2xl p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#007360]/10 flex items-center justify-center text-[#007360] mb-5">
              <Bot className="w-6 h-6 text-[#007360]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#007360]/10 text-[#007360]">
              Intelligent Tutor
            </span>
            <h2 className="text-lg font-bold text-[#333333] mt-3 mb-2">
              AI Learning Assistant
            </h2>
            <p className="text-xs sm:text-sm text-[#333333]/75 leading-relaxed">
              An on-demand virtual tutor trained on European bioeconomy literature, EU green taxonomy mandates, and Life Cycle Assessment frameworks. Accessible 24/7 to resolve technical queries, recommend reading passages, and clarify complex biochemical engineering concepts.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#007360]/10">
            <span className="text-xs font-semibold text-[#007360] flex items-center gap-1">
              Available via floating widget &rarr;
            </span>
          </div>
        </motion.div>

        {/* 2. Personalized Learning */}
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
          className="bg-white border-2 border-[#007360]/20 rounded-2xl p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#43AB98]/20 flex items-center justify-center text-[#007360] mb-5">
              <Compass className="w-6 h-6 text-[#007360]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#43AB98]/20 text-[#007360]">
              Custom Pathways
            </span>
            <h2 className="text-lg font-bold text-[#333333] mt-3 mb-2">
              Personalized Learning
            </h2>
            <p className="text-xs sm:text-sm text-[#333333]/75 leading-relaxed">
              Whether you are a molecular biology PhD student formulating your first patent or a business graduate building an agritech financial forecast, the lab dynamically structures customized syllabus tracks adapted to your background and technology readiness level (TRL).
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#007360]/10">
            <span className="text-xs font-semibold text-[#007360] flex items-center gap-1">
              Beginner to Advanced modules
            </span>
          </div>
        </motion.div>

        {/* 3. Adaptive Assessment */}
        <motion.div
          whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
          className="bg-white border-2 border-[#007360]/20 rounded-2xl p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#0057A9]/10 flex items-center justify-center text-[#0057A9] mb-5">
              <Sliders className="w-6 h-6 text-[#0057A9]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0057A9]/10 text-[#0057A9]">
              Real-Time Validation
            </span>
            <h2 className="text-lg font-bold text-[#333333] mt-3 mb-2">
              Adaptive Assessment
            </h2>
            <p className="text-xs sm:text-sm text-[#333333]/75 leading-relaxed">
              Interactive case study simulations and scenario-based challenge questions evaluate practical problem-solving. Learners receive instantaneous diagnostic feedback, automated formula validations, and verifiable digital completion badges recognized by partner universities.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#007360]/10">
            <span className="text-xs font-semibold text-[#0057A9] flex items-center gap-1">
              Verifiable ECTS certificates
            </span>
          </div>
        </motion.div>
      </div>

      {/* European Moodle LMS Integration Architecture */}
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="p-8 sm:p-10 rounded-2xl bg-[#FFFBF3] border border-[#007360]/15 shadow-2xs hover:shadow-md transition-shadow"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#007360]">
              <Laptop className="w-4 h-4" />
              Moodle LMS Backend Integration
            </div>
            <h2 className="text-2xl font-bold text-[#333333]">
              Seamless Integration with European Higher Education Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-[#333333]/80 leading-relaxed">
              BioBusiness Lab is built natively on top of Moodle 4.x, the world’s most trusted open-source learning management system. Through eduGAIN single-sign-on (SSO), European students can enroll directly with their existing institutional university credentials without creating new passwords.
            </p>
            <ul className="space-y-2 text-xs text-[#333333]/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#007360]" />
                SCORM and H5P interactive multimedia simulations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#007360]" />
                Peer-review pitch deck workshops and rubric scoring
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#007360]" />
                Open Badges 2.0 verifiable credentials directly exportable to LinkedIn
              </li>
            </ul>
            <div className="pt-2">
              <a href={moodleUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  size="md"
                  icon={<ExternalLink className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Access Moodle E-Learning Portal
                </Button>
              </a>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
            className="bg-white p-6 rounded-xl border border-[#007360]/15 space-y-4 shadow-2xs"
          >
            <h3 className="text-sm font-bold text-[#333333] border-b border-[#007360]/10 pb-3">
              Standard Learner Journey
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#007360] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </span>
                <div>
                  <div className="font-semibold text-[#333333]">Diagnostic Needs Assessment</div>
                  <p className="text-[#333333]/70 mt-0.5">Identify knowledge gaps in bio-engineering or venture financing.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#007360] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </span>
                <div>
                  <div className="font-semibold text-[#333333]">Modular Video & Reading Units</div>
                  <p className="text-[#333333]/70 mt-0.5">Engage with micro-lessons delivered by top European researchers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#007360] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </span>
                <div>
                  <div className="font-semibold text-[#333333]">Tool Application & AI Coaching</div>
                  <p className="text-[#333333]/70 mt-0.5">Fill out your Bio-Venture Canvas with AI real-time guidance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#007360] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  4
                </span>
                <div>
                  <div className="font-semibold text-[#333333]">Accredited Certification</div>
                  <p className="text-[#333333]/70 mt-0.5">Earn digital badges and European ECTS recognition.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
