import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  BookOpen,
  Newspaper,
  FileText,
  Users,
  Tags,
  HelpCircle,
  Inbox,
  Settings,
  LogOut,
  ShieldCheck,
  Download,
  ExternalLink,
  Lock,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { MetricCard } from '../ui/Cards.tsx';
import { Button } from '../ui/Buttons.tsx';
import { CoursesManager } from './CoursesManager.tsx';
import { NewsManager } from './NewsManager.tsx';
import { ResourcesManager } from './ResourcesManager.tsx';
import { PartnersManager } from './PartnersManager.tsx';
import { CategoriesManager } from './CategoriesManager.tsx';
import { FaqsManager } from './FaqsManager.tsx';
import { MessagesManager } from './MessagesManager.tsx';
import { SettingsManager } from './SettingsManager.tsx';
import {
  Course,
  NewsEvent,
  Resource,
  Partner,
  Category,
  Faq,
  ContactMessage,
  SiteSettings,
} from '../../types/schema.ts';

interface AdminDashboardProps {
  onExitAdmin: () => void;
  courses: Course[];
  news: NewsEvent[];
  resources: Resource[];
  partners: Partner[];
  categories: Category[];
  faqs: Faq[];
  messages: ContactMessage[];
  settings: SiteSettings;
  onRefreshData: () => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onExitAdmin,
  courses,
  news,
  resources,
  partners,
  categories,
  faqs,
  messages,
  settings,
  onRefreshData,
}) => {
  // Mock Auth state with persistence
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('biobusiness_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('coordinator@biobusinesscatalyst.eu');
  const [loginPass, setLoginPass] = useState('erasmus2026');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<string>('overview');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPass.length >= 4) {
      setIsAuthenticated(true);
      localStorage.setItem('biobusiness_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Minimum 4 characters.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('biobusiness_admin_auth');
  };

  // If not authenticated, show secure login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#FFFBF3]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white border border-[#007360]/20 rounded-2xl p-8 shadow-lg space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-[#007360]/10 border border-[#007360]/20 flex items-center justify-center text-[#007360] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#333333]">BioBusiness Lab Admin CMS</h2>
            <p className="text-xs text-[#333333]/70">
              Authorized consortium personnel access only.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#333333] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#007360]/25 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              />
            </div>

            <div>
              <label className="block font-bold text-[#333333] mb-1">Master Password</label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#007360]/25 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              />
              <span className="text-[10px] text-[#333333]/50 block mt-1">
                Demo default prefilled for instant review.
              </span>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full justify-center">
              Authenticate & Enter CMS
            </Button>
          </form>

          <div className="pt-4 border-t border-[#007360]/10 text-center">
            <button
              onClick={onExitAdmin}
              className="text-xs text-[#007360] font-semibold hover:underline cursor-pointer"
            >
              &larr; Return to Public Website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Calculate high-level summary metrics
  const totalDownloads = resources.reduce((acc, r) => acc + (r.download_count || 0), 0);
  const pendingInquiries = messages.filter(m => !m.is_resolved).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" />, count: courses.length },
    { id: 'news', label: 'News & Events', icon: <Newspaper className="w-4 h-4" />, count: news.length },
    { id: 'resources', label: 'Resources & Toolkits', icon: <FileText className="w-4 h-4" />, count: resources.length },
    { id: 'partners', label: 'Consortium Partners', icon: <Users className="w-4 h-4" />, count: partners.length },
    { id: 'categories', label: 'Taxonomy', icon: <Tags className="w-4 h-4" />, count: categories.length },
    { id: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-4 h-4" />, count: faqs.length },
    {
      id: 'messages',
      label: 'Contact Inbox',
      icon: <Inbox className="w-4 h-4" />,
      badge: pendingInquiries > 0 ? `${pendingInquiries} new` : undefined,
    },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-[#FFFBF3]/40 min-h-screen">
      {/* CMS Top Bar */}
      <div className="bg-white border-b border-[#007360]/15 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {settings.logo_url ? (
            <div className="h-10 flex items-center justify-center bg-[#FFFBF3] px-2.5 py-1 rounded-lg border border-[#007360]/20 shadow-2xs">
              <img
                src={settings.logo_url}
                alt="Website Logo"
                className="max-h-8 max-w-[140px] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-lg bg-[#007360] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}
          <div>
            <span className="font-bold text-sm text-[#333333]">BioBusiness Lab CMS</span>
            <span className="text-[10px] text-[#007360] font-semibold block">
              Consortium Administration
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExitAdmin}
            className="text-xs font-semibold text-[#007360] hover:text-[#43AB98] flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#007360]/20 hover:bg-[#FFFBF3] transition-colors cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            View Live Site
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-[#333333]/60 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Sign out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CMS Sidebar Nav */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="bg-white border border-[#007360]/15 rounded-xl p-3 shadow-2xs space-y-1">
              {navItems.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#007360] text-white shadow-xs'
                        : 'text-[#333333] hover:bg-[#FFFBF3]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-white' : 'text-[#007360]'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#FF9F00] text-white">
                        {item.badge}
                      </span>
                    ) : item.count !== undefined ? (
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#007360]/10 text-[#007360]'
                        }`}
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </motion.button>
                );
              })}
            </div>

            {/* Erasmus Project info badge */}
            <div className="p-4 rounded-xl bg-white border border-[#007360]/15 text-[11px] text-[#333333]/70 space-y-1">
              <div className="font-bold text-[#007360]">Erasmus+ Project</div>
              <div>Ref: 2023-1-EL01-KA220-HED-000159428</div>
              <div>Co-funded by the European Union</div>
            </div>
          </aside>

          {/* CMS Main Content Area */}
          <main className="lg:col-span-9">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Metric Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Accredited Courses"
                    value={courses.length}
                    icon={<BookOpen className="w-5 h-5" />}
                    subtitle="Active on Moodle"
                  />
                  <MetricCard
                    title="Open Resources"
                    value={resources.length}
                    icon={<FileText className="w-5 h-5" />}
                    subtitle="Toolkits & Models"
                  />
                  <MetricCard
                    title="Total Downloads"
                    value={totalDownloads}
                    icon={<Download className="w-5 h-5" />}
                    badge="Verified Hits"
                  />
                  <MetricCard
                    title="Pending Inquiries"
                    value={pendingInquiries}
                    icon={<Inbox className="w-5 h-5" />}
                    subtitle="In Contact Inbox"
                  />
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-white border border-[#007360]/15 rounded-xl p-6 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-[#333333]">Consortium Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('courses')}
                      className="p-4 rounded-lg bg-[#FFFBF3] border border-[#007360]/15 text-left hover:border-[#007360] hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="font-bold text-xs text-[#007360]">Add Course Module</div>
                      <p className="text-[11px] text-[#333333]/70 mt-1">
                        Publish new curriculum with external Moodle course ID link.
                      </p>
                    </motion.button>

                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('news')}
                      className="p-4 rounded-lg bg-[#FFFBF3] border border-[#007360]/15 text-left hover:border-[#007360] hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="font-bold text-xs text-[#007360]">Publish News & Events</div>
                      <p className="text-[11px] text-[#333333]/70 mt-1">
                        Post consortium meetings, workshops, and milestones.
                      </p>
                    </motion.button>

                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('resources')}
                      className="p-4 rounded-lg bg-[#FFFBF3] border border-[#007360]/15 text-left hover:border-[#007360] hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="font-bold text-xs text-[#007360]">Upload Startup Toolkit</div>
                      <p className="text-[11px] text-[#333333]/70 mt-1">
                        Add open-access financial spreadsheets or policy briefs.
                      </p>
                    </motion.button>

                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('settings')}
                      className="p-4 rounded-lg bg-[#FFFBF3] border border-[#007360]/15 text-left hover:border-[#007360] hover:shadow-xs transition-all cursor-pointer"
                    >
                      <div className="font-bold text-xs text-[#007360]">Change Website Logo</div>
                      <p className="text-[11px] text-[#333333]/70 mt-1">
                        Upload custom SVG/PNG logo or customize brand identity.
                      </p>
                    </motion.button>
                  </div>
                </div>

                {/* Recent Inquiries and News Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Latest Inquiries */}
                  <div className="bg-white border border-[#007360]/15 rounded-xl p-5 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#333333] uppercase tracking-wider">
                        Recent Public Inquiries
                      </h4>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-[11px] text-[#007360] font-semibold hover:underline"
                      >
                        View All ({messages.length})
                      </button>
                    </div>

                    <div className="divide-y divide-[#007360]/10 text-xs">
                      {messages.slice(0, 3).map(m => (
                        <div key={m.id} className="py-2.5 flex items-center justify-between gap-2">
                          <div className="truncate max-w-[240px]">
                            <div className="font-bold text-[#333333] truncate">{m.subject}</div>
                            <div className="text-[11px] text-[#333333]/60 truncate">{m.name}</div>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              m.is_resolved
                                ? 'bg-[#38B942]/15 text-[#008C45]'
                                : 'bg-[#FF9F00]/15 text-[#B26B00]'
                            }`}
                          >
                            {m.is_resolved ? 'Resolved' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Latest News Feed */}
                  <div className="bg-white border border-[#007360]/15 rounded-xl p-5 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#333333] uppercase tracking-wider">
                        Recent Dissemination Items
                      </h4>
                      <button
                        onClick={() => setActiveTab('news')}
                        className="text-[11px] text-[#007360] font-semibold hover:underline"
                      >
                        Manage ({news.length})
                      </button>
                    </div>

                    <div className="divide-y divide-[#007360]/10 text-xs">
                      {news.slice(0, 3).map(n => (
                        <div key={n.id} className="py-2.5 flex items-center justify-between gap-2">
                          <div className="truncate max-w-[240px]">
                            <div className="font-bold text-[#333333] truncate">{n.title}</div>
                            <div className="text-[11px] text-[#333333]/60">
                              {new Date(n.published_at).toLocaleDateString()}
                            </div>
                          </div>
                          <span className="text-[11px] text-[#007360] font-mono shrink-0">
                            {n.event_date ? 'Event' : 'Article'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <CoursesManager
                courses={courses}
                categories={categories}
                onRefresh={onRefreshData}
              />
            )}

            {activeTab === 'news' && (
              <NewsManager
                news={news}
                categories={categories}
                onRefresh={onRefreshData}
              />
            )}

            {activeTab === 'resources' && (
              <ResourcesManager
                resources={resources}
                categories={categories}
                onRefresh={onRefreshData}
              />
            )}

            {activeTab === 'partners' && (
              <PartnersManager partners={partners} onRefresh={onRefreshData} />
            )}

            {activeTab === 'categories' && (
              <CategoriesManager
                categories={categories}
                onRefresh={onRefreshData}
              />
            )}

            {activeTab === 'faqs' && (
              <FaqsManager faqs={faqs} onRefresh={onRefreshData} />
            )}

            {activeTab === 'messages' && (
              <MessagesManager
                messages={messages}
                onRefresh={onRefreshData}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsManager
                settings={settings}
                onRefresh={onRefreshData}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
