import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeaderNav } from './components/public/HeaderNav.tsx';
import { Footer } from './components/public/Footer.tsx';
import { FloatingAIWidget } from './components/ui/FloatingAIWidget.tsx';
import { HomeView } from './components/public/HomeView.tsx';
import { AboutView } from './components/public/AboutView.tsx';
import { LabOverviewView } from './components/public/LabOverviewView.tsx';
import { CoursesView } from './components/public/CoursesView.tsx';
import { ResourcesView } from './components/public/ResourcesView.tsx';
import { NewsEventsView } from './components/public/NewsEventsView.tsx';
import { PartnersView } from './components/public/PartnersView.tsx';
import { FaqsView } from './components/public/FaqsView.tsx';
import { ContactView } from './components/public/ContactView.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import {
  HydratedCourse,
  HydratedNewsEvent,
  HydratedResource,
  Partner,
  Category,
  Faq,
  ContactMessage,
  SiteSettings,
  Course,
  NewsEvent,
  Resource,
} from './types/schema.ts';
import { db } from './lib/db.ts';

export default function App() {
  // State from relational mock DB
  const [courses, setCourses] = useState<Course[]>([]);
  const [news, setNews] = useState<NewsEvent[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(db.getSiteSettings());

  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedNewsItem, setSelectedNewsItem] = useState<HydratedNewsEvent | null>(null);
  const [downloadingResourceId, setDownloadingResourceId] = useState<string | null>(null);

  // Fetch full dataset from Express backend
  const fetchAllData = useCallback(async () => {
    try {
      const res = await fetch('/api/public/bootstrap');
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setCategories(data.categories);
        setCourses(data.courses);
        setNews(data.news);
        setResources(data.resources);
        setPartners(data.partners);
        setFaqs(data.faqs);
        setMessages(data.messages || []);
      } else {
        // Fallback to local DB abstraction if server is compiling
        setSettings(db.getSiteSettings());
        setCategories(db.getCategories());
        setCourses(db.getCourses());
        setNews(db.getNews());
        setResources(db.getResources());
        setPartners(db.getPartners());
        setFaqs(db.getFaqs());
        setMessages(db.getContactMessages());
      }
    } catch (err) {
      // Fallback
      setSettings(db.getSiteSettings());
      setCategories(db.getCategories());
      setCourses(db.getCourses());
      setNews(db.getNews());
      setResources(db.getResources());
      setPartners(db.getPartners());
      setFaqs(db.getFaqs());
      setMessages(db.getContactMessages());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();

    // Check hash for direct route navigation
    const hash = window.location.hash.replace('#', '');
    if (hash === 'admin') {
      setIsAdminMode(true);
    } else if (hash) {
      setCurrentTab(hash);
    }

    const handleHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (h === 'admin') {
        setIsAdminMode(true);
      } else if (h) {
        setIsAdminMode(false);
        setCurrentTab(h);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [fetchAllData]);

  const handleSelectTab = (tab: string) => {
    setIsAdminMode(false);
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAdmin = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      window.location.hash = currentTab;
    } else {
      setIsAdminMode(true);
      window.location.hash = 'admin';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hydrated data with foreign key category lookups
  const categoryMap = new Map(categories.map(c => [c.id, c.name]));

  const hydratedCourses: HydratedCourse[] = courses.map(c => ({
    ...c,
    category_name: categoryMap.get(c.category_id),
  }));

  const hydratedNews: HydratedNewsEvent[] = news.map(n => ({
    ...n,
    category_name: categoryMap.get(n.category_id),
  }));

  const hydratedResources: HydratedResource[] = resources.map(r => ({
    ...r,
    category_name: categoryMap.get(r.category_id),
  }));

  // Handle Resource Download (increments counter via API)
  const handleDownloadResource = async (resource: HydratedResource) => {
    setDownloadingResourceId(resource.id);
    try {
      const res = await fetch(`/api/public/resources/${resource.id}/download`, {
        method: 'POST',
      });
      if (res.ok) {
        const updated = await res.json();
        // Update local state
        setResources(prev =>
          prev.map(r => (r.id === resource.id ? { ...r, download_count: updated.download_count } : r))
        );
      }

      // Simulate file download
      const link = document.createElement('a');
      link.href = resource.file_url;
      link.target = '_blank';
      link.download = `${resource.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setTimeout(() => setDownloadingResourceId(null), 600);
    }
  };

  const handleEnrollCourse = (course: HydratedCourse) => {
    window.open(course.enrollment_url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBF3] flex flex-col items-center justify-center p-6 text-[#333333]">
        <div className="w-10 h-10 border-3 border-[#007360] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-[#007360]">Loading BioBusiness Lab...</p>
        <p className="text-xs text-[#333333]/60 mt-1">
          Co-funded by the Erasmus+ Programme of the European Union
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333333] selection:bg-[#43AB98]/25 selection:text-[#007360]">
      {/* Top Header Navigation */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isAdmin={isAdminMode}
        onToggleAdmin={handleToggleAdmin}
        moodleUrl={settings.moodle_login_url}
        logoUrl={settings.logo_url}
        siteTitle={settings.site_title}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={isAdminMode ? 'admin' : currentTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            {isAdminMode ? (
              <AdminDashboard
                onExitAdmin={() => {
                  setIsAdminMode(false);
                  window.location.hash = currentTab;
                }}
                courses={courses}
                news={news}
                resources={resources}
                partners={partners}
                categories={categories}
                faqs={faqs}
                messages={messages}
                settings={settings}
                onRefreshData={fetchAllData}
              />
            ) : (
              <>
                {currentTab === 'home' && (
                  <HomeView
                    courses={hydratedCourses}
                    news={hydratedNews}
                    onSelectTab={handleSelectTab}
                    onSelectNews={setSelectedNewsItem}
                    onEnrollCourse={handleEnrollCourse}
                  />
                )}

                {currentTab === 'about' && (
                  <AboutView partners={partners} onSelectTab={handleSelectTab} />
                )}

                {currentTab === 'lab' && (
                  <LabOverviewView
                    onSelectTab={handleSelectTab}
                    moodleUrl={settings.moodle_login_url}
                  />
                )}

                {currentTab === 'courses' && (
                  <CoursesView
                    courses={hydratedCourses}
                    categories={categories}
                    onEnrollCourse={handleEnrollCourse}
                    moodleLoginUrl={settings.moodle_login_url}
                  />
                )}

                {currentTab === 'resources' && (
                  <ResourcesView
                    resources={hydratedResources}
                    categories={categories}
                    onDownloadResource={handleDownloadResource}
                    downloadingId={downloadingResourceId}
                  />
                )}

                {currentTab === 'news' && (
                  <NewsEventsView
                    news={hydratedNews}
                    categories={categories}
                    selectedItem={selectedNewsItem}
                    onSelectItem={setSelectedNewsItem}
                  />
                )}

                {currentTab === 'partners' && (
                  <PartnersView partners={partners} onSelectTab={handleSelectTab} />
                )}

                {currentTab === 'faqs' && (
                  <FaqsView faqs={faqs} onSelectTab={handleSelectTab} />
                )}

                {currentTab === 'contact' && <ContactView />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Interactive Floating AI Learning Assistant Widget */}
      {!isAdminMode && (
        <FloatingAIWidget enabled={settings.ai_widget_enabled} />
      )}

      {/* Footer with Mandatory EU Funding Disclaimer */}
      {!isAdminMode && (
        <Footer
          onSelectTab={handleSelectTab}
          moodleUrl={settings.moodle_login_url}
          disclaimerText={settings.eu_disclaimer_text}
          logoUrl={settings.logo_url}
          siteTitle={settings.site_title}
          showSiteTitle={settings.show_site_title}
        />
      )}
    </div>
  );
}
