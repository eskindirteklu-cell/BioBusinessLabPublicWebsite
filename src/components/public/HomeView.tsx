import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  Download,
  Sparkles,
  Users,
  Award,
  Leaf,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../ui/Buttons.tsx';
import { CourseCard, NewsCard } from '../ui/Cards.tsx';
import { HydratedCourse, HydratedNewsEvent } from '../../types/schema.ts';

interface HomeViewProps {
  courses: HydratedCourse[];
  news: HydratedNewsEvent[];
  onSelectTab: (tab: string) => void;
  onSelectNews: (item: HydratedNewsEvent) => void;
  onEnrollCourse: (course: HydratedCourse) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  courses,
  news,
  onSelectTab,
  onSelectNews,
  onEnrollCourse,
}) => {
  const featuredCourses = courses.filter(c => c.is_featured).slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Light Hero Section sitting strictly on #FFFBF3 warm background */}
      <section className="relative overflow-hidden bg-[#FFFBF3] border-b border-[#007360]/15 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007360]/10 border border-[#007360]/20 text-[#007360] text-xs font-bold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5" />
                Erasmus+ Cooperation Partnership in Higher Education
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#333333] leading-tight tracking-tight">
                Empowering Entrepreneurs for a{' '}
                <span className="text-[#007360]">Sustainable Bioeconomy</span>
              </h1>

              <p className="text-base sm:text-lg text-[#333333]/85 leading-relaxed font-normal max-w-2xl">
                The <strong>BioBusiness Catalyst</strong> bridges the gap between academic biotechnology research and commercial circular enterprises. Access 12 open-access e-learning modules, certified Moodle curricula, and validated market toolkits co-developed across 6 European nations.
              </p>

              {/* Call to Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onSelectTab('courses')}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Explore BioBusiness Lab Courses
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onSelectTab('resources')}
                  icon={<Download className="w-4 h-4" />}
                >
                  Download Startup Toolkits
                </Button>
              </div>

              {/* Consortium trust strip */}
              <div className="pt-4 flex items-center gap-4 text-xs text-[#333333]/70">
                <span className="font-semibold text-[#007360]">Co-Funded by EU:</span>
                <span>• 6 Academic & Research Partners</span>
                <span>• ECTS-Verifiable Credentials</span>
                <span>• 100% Free & Open-Access</span>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="relative bg-white border-2 border-[#007360]/20 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#007360]/10 mb-5">
                  <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
                    BioBusiness Catalyst Platform
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#38B942]/15 text-[#008C45] font-semibold">
                    Live Portal
                  </span>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    className="p-4 rounded-xl bg-[#FFFBF3] border border-[#007360]/15 flex items-start gap-3.5 cursor-default hover:border-[#007360]/35 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#007360] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#333333]">Moodle Open LMS</h3>
                      <p className="text-xs text-[#333333]/75 mt-0.5">
                        Interactive quizzes, peer workshops, and European digital open badges.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    className="p-4 rounded-xl bg-[#FFFBF3] border border-[#007360]/15 flex items-start gap-3.5 cursor-default hover:border-[#007360]/35 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#43AB98] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#333333]">AI Learning Assistant</h3>
                      <p className="text-xs text-[#333333]/75 mt-0.5">
                        Real-time guidance on biomass classification, LCA methodologies, and EU directives.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                    className="p-4 rounded-xl bg-[#FFFBF3] border border-[#007360]/15 flex items-start gap-3.5 cursor-default hover:border-[#007360]/35 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0057A9] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#333333]">Startup Accelerator Toolkits</h3>
                      <p className="text-xs text-[#333333]/75 mt-0.5">
                        Spreadsheet financial models and Business Model Canvas templates for bio-ventures.
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#007360]/10 flex items-center justify-between">
                  <span className="text-xs text-[#333333]/60">Explore Platform Modules</span>
                  <motion.button
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectTab('lab')}
                    className="text-xs font-bold text-[#007360] hover:text-[#43AB98] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    View Lab Architecture <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Project Impact Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333]">
            Four Catalysts for European Bio-entrepreneurship
          </h2>
          <p className="text-sm text-[#333333]/75 mt-2">
            Structured intervention mechanisms established by the consortium to accelerate sustainable bio-innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="bg-white border border-[#007360]/15 rounded-xl p-6 shadow-2xs hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-lg bg-[#007360]/10 flex items-center justify-center text-[#007360] mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#333333] mb-2">Open Digital Learning</h3>
            <p className="text-xs text-[#333333]/75 leading-relaxed">
              Modular curricula covering circular bio-refineries, industrial biotechnology, and eco-design aligned with the EU Green Taxonomy.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="bg-white border border-[#007360]/15 rounded-xl p-6 shadow-2xs hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-lg bg-[#43AB98]/15 flex items-center justify-center text-[#007360] mb-4">
              <Download className="w-6 h-6 text-[#007360]" />
            </div>
            <h3 className="text-base font-bold text-[#333333] mb-2">Validated Venture Toolkits</h3>
            <p className="text-xs text-[#333333]/75 leading-relaxed">
              Open-source CAPEX/OPEX models, IP licensing guidelines, and Life Cycle Assessment templates ready for startup commercialization.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="bg-white border border-[#007360]/15 rounded-xl p-6 shadow-2xs hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-lg bg-[#0057A9]/10 flex items-center justify-center text-[#0057A9] mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#333333] mb-2">Pan-European Network</h3>
            <p className="text-xs text-[#333333]/75 leading-relaxed">
              Direct connection to 6 European partner universities, regional innovation incubators, and bio-based impact investors.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="bg-white border border-[#007360]/15 rounded-xl p-6 shadow-2xs hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-lg bg-[#FF9F00]/15 flex items-center justify-center text-[#FF9F00] mb-4">
              <Sparkles className="w-6 h-6 text-[#B26B00]" />
            </div>
            <h3 className="text-base font-bold text-[#333333] mb-2">AI Learning Assistant</h3>
            <p className="text-xs text-[#333333]/75 leading-relaxed">
              Context-aware digital guidance providing fast answers on course prerequisites, funding streams, and bioeconomy regulations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="bg-[#FFFBF3]/50 py-16 border-y border-[#007360]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
                E-Learning Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mt-1">
                Featured Accredited Courses
              </h2>
              <p className="text-xs sm:text-sm text-[#333333]/70 mt-1">
                Self-paced online training modules hosted on the European Moodle LMS platform.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab('courses')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              View All 12 Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} onEnroll={onEnrollCourse} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
              Dissemination & Outreach
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mt-1">
              Latest News & Milestones
            </h2>
            <p className="text-xs sm:text-sm text-[#333333]/70 mt-1">
              Updates on curriculum rollouts, European pitch contests, and research publications.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTab('news')}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            All News & Events
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map(item => (
            <NewsCard key={item.id} item={item} onReadMore={onSelectNews} />
          ))}
        </div>
      </section>

      {/* Consortium Partnership Callout Banner (sitting strictly on light card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className="bg-[#FFFBF3] border-2 border-[#007360]/20 rounded-2xl p-8 sm:p-12 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#007360]">
              Higher Education & Industry Collaboration
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#333333]">
              Join the BioBusiness Catalyst Academic & Regional Alliance
            </h2>
            <p className="text-xs sm:text-sm text-[#333333]/80 leading-relaxed">
              Are you an academic department, bio-incubator, or regional development agency? Connect with the consortium to pilot our modules with your student cohorts or access joint Erasmus+ mobility workshops.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={() => onSelectTab('contact')}
            >
              Contact Consortium Secretariat
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => onSelectTab('partners')}
            >
              View All 6 Partners
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
