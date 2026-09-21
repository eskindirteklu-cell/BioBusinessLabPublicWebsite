import {
  Page,
  PageSection,
  Category,
  NewsEvent,
  Course,
  Resource,
  Partner,
  Faq,
  ContactMessage,
  SiteSetting,
  SiteSettings,
  HydratedNewsEvent,
  HydratedCourse,
  HydratedResource,
  HydratedPage,
  DashboardMetrics,
} from '../types/schema.ts';

// Initial Categories
let categories: Category[] = [
  { id: 'cat-news-1', name: 'Project Milestone', slug: 'project-milestone', type: 'news' },
  { id: 'cat-news-2', name: 'Workshops & Events', slug: 'workshops-events', type: 'news' },
  { id: 'cat-news-3', name: 'Policy & Market Insights', slug: 'policy-market-insights', type: 'news' },
  { id: 'cat-res-1', name: 'Startup Toolkits', slug: 'startup-toolkits', type: 'resource' },
  { id: 'cat-res-2', name: 'Policy & Regulatory Briefs', slug: 'policy-regulatory-briefs', type: 'resource' },
  { id: 'cat-res-3', name: 'Industry Case Studies', slug: 'industry-case-studies', type: 'resource' },
  { id: 'cat-course-1', name: 'Foundations', slug: 'foundations', type: 'course' },
  { id: 'cat-course-2', name: 'Entrepreneurship & Scaling', slug: 'entrepreneurship-scaling', type: 'course' },
  { id: 'cat-course-3', name: 'Technology & Eco-Design', slug: 'technology-eco-design', type: 'course' },
];

// Initial Pages
let pages: Page[] = [
  {
    id: 'page-home',
    slug: 'home',
    title: 'The BioBusiness Catalyst - Empowering Entrepreneurs for a Sustainable Bioeconomy',
    meta_title: 'BioBusiness Lab | Empowering Sustainable Bioeconomy Entrepreneurs',
    meta_description: 'Erasmus+ funded learning hub offering open e-learning courses, startup toolkits, and innovation networks.',
    locale: 'en',
    is_published: true,
  },
  {
    id: 'page-about',
    slug: 'about',
    title: 'About the BioBusiness Catalyst Project',
    meta_title: 'About The Project | BioBusiness Catalyst (Erasmus+)',
    meta_description: 'Discover the vision, consortium partners, and impact roadmap behind our Erasmus+ bioeconomy capacity-building initiative.',
    locale: 'en',
    is_published: true,
  },
  {
    id: 'page-lab',
    slug: 'biobusiness-lab',
    title: 'BioBusiness Lab Digital Learning Platform',
    meta_title: 'BioBusiness Lab | Digital E-Learning Hub & AI Assistant',
    meta_description: 'Interactive modular courses, AI Learning Assistant, and customized entrepreneurial roadmaps for the circular bioeconomy.',
    locale: 'en',
    is_published: true,
  },
  {
    id: 'page-courses',
    slug: 'courses',
    title: 'Courses & Capacity-Building Modules',
    meta_title: 'Bioeconomy Courses & Training Modules | BioBusiness Lab',
    meta_description: 'Free, accredited, self-paced bioeconomy entrepreneurship training integrated with the European Moodle LMS ecosystem.',
    locale: 'en',
    is_published: true,
  },
  {
    id: 'page-resources',
    slug: 'resources',
    title: 'Open Access Knowledge & Toolkit Library',
    meta_title: 'BioBusiness Resources & Toolkits | Erasmus+',
    meta_description: 'Practical guides, financial models, regulatory templates, and real-world European bio-venture case studies.',
    locale: 'en',
    is_published: true,
  },
  {
    id: 'page-news',
    slug: 'news',
    title: 'Latest News, Milestones & Events',
    meta_title: 'Bioeconomy News & Events | BioBusiness Catalyst',
    meta_description: 'Stay informed about our pan-European hackathons, partner meetings, research publications, and webinars.',
    locale: 'en',
    is_published: true,
  },
  {
    id: 'page-partners',
    slug: 'partners',
    title: 'Consortium Partners & Strategic Alliances',
    meta_title: 'Consortium Partners | The BioBusiness Catalyst',
    meta_description: 'Meet the 6 European universities, research institutions, and innovation hubs driving this initiative.',
    locale: 'en',
    is_published: true,
  },
  {
    id: 'page-faqs',
    slug: 'faqs',
    title: 'Frequently Asked Questions',
    meta_title: 'BioBusiness Lab FAQs | Questions & Guidance',
    meta_description: 'Clear answers on certification, Moodle access, Erasmus+ participation, and project deliverables.',
    locale: 'en',
    is_published: true,
  },
  {
    id: 'page-contact',
    slug: 'contact',
    title: 'Contact the Consortium Secretariat',
    meta_title: 'Contact BioBusiness Catalyst Secretariat',
    meta_description: 'Get in touch with our European project coordination office for inquiries and partnerships.',
    locale: 'en',
    is_published: true,
  },
];

// Page sections
let pageSections: PageSection[] = [
  {
    id: 'sec-home-hero',
    page_id: 'page-home',
    section_key: 'hero',
    content_json: JSON.stringify({
      eyebrow: 'Erasmus+ Cooperation Partnership',
      headline: 'Empowering Next-Generation Entrepreneurs for a Sustainable European Bioeconomy',
      subheading: 'Access free accredited courses, market-tested toolkits, and an AI-driven learning platform designed by leading European research institutions and business incubators.',
      primary_cta_text: 'Explore Courses in BioBusiness Lab',
      primary_cta_link: '/courses',
      secondary_cta_text: 'Download Startup Toolkits',
      secondary_cta_link: '/resources',
    }),
    sort_order: 1,
  },
  {
    id: 'sec-home-pillars',
    page_id: 'page-home',
    section_key: 'pillars',
    content_json: JSON.stringify({
      title: 'Four Catalysts for Bio-entrepreneurship',
      pillars: [
        {
          title: 'Open Digital Learning',
          desc: 'Modular Moodle-integrated curricula covering circular bio-refineries, biomass valorisation, and ESG compliance.',
        },
        {
          title: 'Validated Venture Toolkits',
          desc: 'Downloadable financial forecast templates, IP assessment matrices, and techno-economic feasibility tools.',
        },
        {
          title: 'Pan-European Network',
          desc: 'Direct cross-border mentorship linking university spin-offs with bioeconomy investors and cluster ecosystems.',
        },
        {
          title: 'AI Learning Assistant',
          desc: 'Personalized interactive guidance navigating EU green taxonomy, funding calls, and course pathways.',
        },
      ],
    }),
    sort_order: 2,
  },
  {
    id: 'sec-home-stats',
    page_id: 'page-home',
    section_key: 'stats',
    content_json: JSON.stringify({
      stats: [
        { value: '6', label: 'European Consortium Partners' },
        { value: '12+', label: 'Accredited Training Modules' },
        { value: '1,500+', label: 'Target Learners & Founders' },
        { value: '100%', label: 'Open-Access & EU Funded' },
      ],
    }),
    sort_order: 3,
  },
];

// News & Events
let newsEvents: NewsEvent[] = [
  {
    id: 'news-1',
    category_id: 'cat-news-1',
    title: 'Consortium Launches BioBusiness Lab Open Digital Curriculum',
    slug: 'consortium-launches-biobusiness-lab-curriculum',
    body_rich_text: 'The BioBusiness Catalyst consortium has officially unveiled its flagship digital learning environment. Offering 12 self-paced modules, the platform enables aspiring entrepreneurs to transform laboratory bio-innovations into viable commercial ventures compliant with the EU Circular Economy Action Plan.',
    cover_image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    event_date: null,
    location: 'Brussels & Online',
    status: 'published',
    published_at: '2025-11-15T10:00:00Z',
  },
  {
    id: 'news-2',
    category_id: 'cat-news-2',
    title: 'European Bioeconomy Pitching & Venture Showcase 2026',
    slug: 'european-bioeconomy-pitching-showcase-2026',
    body_rich_text: 'Join 24 selected bio-based startups pitching before leading venture funds, impact investors, and regional development agencies. Featuring keynote talks on sustainable feedstock sourcing and industrial symbiosis.',
    cover_image_url: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80',
    event_date: '2026-05-14T09:00:00Z',
    location: 'Bologna, Italy & Hybrid Stream',
    status: 'published',
    published_at: '2025-12-01T14:30:00Z',
  },
  {
    id: 'news-3',
    category_id: 'cat-news-3',
    title: 'Policy Brief: Navigating the EU Green Taxonomy for Bio-Startups',
    slug: 'policy-brief-navigating-eu-green-taxonomy',
    body_rich_text: 'A comprehensive analytical paper authored by consortium researchers outlining how early-stage biotechnology and agritech companies can establish auditable sustainability documentation to unlock Horizon Europe and EIC equity funding.',
    cover_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    event_date: null,
    location: 'Online Publication',
    status: 'published',
    published_at: '2026-01-20T08:00:00Z',
  },
  {
    id: 'news-4',
    category_id: 'cat-news-2',
    title: 'Hands-on Bootcamp: Biomass Supply Chain Traceability',
    slug: 'bootcamp-biomass-supply-chain-traceability',
    body_rich_text: 'A 3-day practical virtual intensive for agritech founders, covering Life Cycle Assessment (LCA) tools, zero-waste residue valorisation, and digital product passport frameworks.',
    cover_image_url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    event_date: '2026-06-22T10:00:00Z',
    location: 'Helsinki, Finland & Virtual Hub',
    status: 'published',
    published_at: '2026-02-10T11:15:00Z',
  },
];

// Courses
let courses: Course[] = [
  {
    id: 'course-1',
    category_id: 'cat-course-1',
    title: 'Introduction to the European Circular Bioeconomy',
    slug: 'intro-circular-bioeconomy',
    description: 'Foundational concepts of biological cycles, bio-based feedstock classifications, resource efficiency principles, and EU circular policy directives.',
    level: 'Beginner',
    moodle_course_id: 'MDL-BIO-101',
    enrollment_url: 'https://moodle.biobusinesscatalyst.eu/course/view.php?id=101',
    is_featured: true,
  },
  {
    id: 'course-2',
    category_id: 'cat-course-2',
    title: 'Venture Building & Pitching for Bio-Innovators',
    slug: 'venture-building-pitching',
    description: 'Structure techno-commercial business models, de-risk TRL 4-7 scale-up trajectories, formulate grant-matching strategies, and master investor pitch decks.',
    level: 'Intermediate',
    moodle_course_id: 'MDL-BIO-202',
    enrollment_url: 'https://moodle.biobusinesscatalyst.eu/course/view.php?id=202',
    is_featured: true,
  },
  {
    id: 'course-3',
    category_id: 'cat-course-3',
    title: 'Eco-Design & Life Cycle Assessment (LCA) in Practice',
    slug: 'ecodesign-lca-practice',
    description: 'Step-by-step methodologies to quantify environmental footprints, perform ISO 14040-compliant LCAs, and design recyclable bio-composite packaging.',
    level: 'Advanced',
    moodle_course_id: 'MDL-BIO-303',
    enrollment_url: 'https://moodle.biobusinesscatalyst.eu/course/view.php?id=303',
    is_featured: true,
  },
  {
    id: 'course-4',
    category_id: 'cat-course-2',
    title: 'Securing Public & Private Capital in Green Tech',
    slug: 'capital-greentech-eu',
    description: 'Explore EIC Accelerator mechanics, Horizon Europe clusters, blended finance instruments, venture philanthropy, and ESG angel networks.',
    level: 'Intermediate',
    moodle_course_id: 'MDL-BIO-204',
    enrollment_url: 'https://moodle.biobusinesscatalyst.eu/course/view.php?id=204',
    is_featured: false,
  },
  {
    id: 'course-5',
    category_id: 'cat-course-3',
    title: 'Biomass Residue Valorisation & Biorefinery Models',
    slug: 'biomass-residue-valorisation',
    description: 'Technical evaluation of cascade utilization hierarchies, municipal organic waste processing, and high-value biochemical production.',
    level: 'Advanced',
    moodle_course_id: 'MDL-BIO-305',
    enrollment_url: 'https://moodle.biobusinesscatalyst.eu/course/view.php?id=305',
    is_featured: false,
  },
  {
    id: 'course-6',
    category_id: 'cat-course-1',
    title: 'Intellectual Property & Technology Transfer in Biotech',
    slug: 'ip-tech-transfer-biotech',
    description: 'Protecting patentable microbial strains, licensing university-originated IP, material transfer agreements, and Freedom-to-Operate studies.',
    level: 'All Levels',
    moodle_course_id: 'MDL-BIO-106',
    enrollment_url: 'https://moodle.biobusinesscatalyst.eu/course/view.php?id=106',
    is_featured: false,
  },
];

// Resources
let resources: Resource[] = [
  {
    id: 'res-1',
    category_id: 'cat-res-1',
    title: 'Bio-Venture Business Model Canvas Toolkit',
    description: 'A customized 9-block strategic canvas adapted specifically for circular bio-based enterprises with carbon accounting blocks.',
    file_url: '/assets/resources/bio-venture-canvas-toolkit.pdf',
    resource_type: 'Toolkit',
    download_count: 342,
  },
  {
    id: 'res-2',
    category_id: 'cat-res-2',
    title: 'EU Green Claims Directive & Bio-Labeling Handbook',
    description: 'Guidelines on compliant environmental labeling, third-party certifications (ISCC PLUS, RSB), and avoiding greenwashing penalties.',
    file_url: '/assets/resources/eu-green-claims-handbook.pdf',
    resource_type: 'Policy Brief',
    download_count: 215,
  },
  {
    id: 'res-3',
    category_id: 'cat-res-3',
    title: 'Case Study: Agricultural Waste to Biodegradable Polymers',
    description: 'In-depth financial breakdown and pilot plant scale-up journey of a Greek olive pomace bioplastic spin-off.',
    file_url: '/assets/resources/case-study-olive-pomace-polymers.pdf',
    resource_type: 'Case Study',
    download_count: 189,
  },
  {
    id: 'res-4',
    category_id: 'cat-res-1',
    title: 'Techno-Economic Feasibility Template (Excel Model)',
    description: 'Parametric financial forecasting model with CAPEX, OPEX, sensitivity calculations, and biomass feedstock price volatility assumptions.',
    file_url: '/assets/resources/techno-economic-model-v2.xlsx',
    resource_type: 'Report',
    download_count: 512,
  },
  {
    id: 'res-5',
    category_id: 'cat-res-2',
    title: 'Funding Roadmap: EIC, LIFE & Interreg Opportunities 2026-2027',
    description: 'Curated calendar and eligibility matrix of active European grant and blended equity calls for bioeconomy SMEs.',
    file_url: '/assets/resources/eu-funding-roadmap-2026-2027.pdf',
    resource_type: 'Slide Deck',
    download_count: 428,
  },
];

// Partners
let partners: Partner[] = [
  {
    id: 'partner-1',
    name: 'National Technical University of Athens (NTUA)',
    logo_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80',
    country: 'Greece',
    role_description: 'Lead Project Coordinator & Academic Curriculum Lead (School of Chemical Engineering)',
    website_url: 'https://www.ntua.gr',
    sort_order: 1,
  },
  {
    id: 'partner-2',
    name: 'University of Bologna (UNIBO)',
    logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&q=80',
    country: 'Italy',
    role_description: 'Department of Agricultural and Food Sciences; Lead for Bio-Waste Valorisation Research',
    website_url: 'https://www.unibo.it',
    sort_order: 2,
  },
  {
    id: 'partner-3',
    name: 'VTT Technical Research Centre of Finland',
    logo_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80',
    country: 'Finland',
    role_description: 'Pilot Plant Validation, Biomass Digital Twins, and LCA Methodologies',
    website_url: 'https://www.vttresearch.com',
    sort_order: 3,
  },
  {
    id: 'partner-4',
    name: 'Circular Bioeconomy Alliance Iberia',
    logo_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&q=80',
    country: 'Spain',
    role_description: 'Entrepreneurship Incubator, Investor Matchmaking & Startup Accelerator Lead',
    website_url: 'https://bioeconomy-iberia.eu',
    sort_order: 4,
  },
  {
    id: 'partner-5',
    name: 'European Bioeconomy Network (EuBioNet)',
    logo_url: 'https://images.unsplash.com/photo-1522071823991-b967154d648c?auto=format&fit=crop&w=300&q=80',
    country: 'Belgium',
    role_description: 'Dissemination, Multi-Stakeholder Policy Engagement & European Outreach',
    website_url: 'https://eubionet.eu',
    sort_order: 5,
  },
  {
    id: 'partner-6',
    name: 'Fraunhofer Institute for Interfacial Engineering (IGB)',
    logo_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80',
    country: 'Germany',
    role_description: 'Industrial Biotechnology, Fermentation Technologies & Scale-up Testing',
    website_url: 'https://www.igb.fraunhofer.de',
    sort_order: 6,
  },
];

// FAQs
let faqs: Faq[] = [
  {
    id: 'faq-1',
    category: 'General & Participation',
    question: 'What is the BioBusiness Catalyst project and who can participate?',
    answer: 'The BioBusiness Catalyst is an Erasmus+ Cooperation Partnership co-funded by the European Union. The program is completely free and open to higher education students, early-stage researchers, entrepreneurs, and SME professionals across Europe seeking to develop bio-based innovations.',
    sort_order: 1,
  },
  {
    id: 'faq-2',
    category: 'General & Participation',
    question: 'Are the courses accredited and do I receive a certificate?',
    answer: 'Yes. Every completed module awards an accredited digital certificate with verifiable European ECTS compatibility points (where applicable via partner universities) and digital Open Badges that can be shared directly on LinkedIn and CVs.',
    sort_order: 2,
  },
  {
    id: 'faq-3',
    category: 'Platform & Moodle Access',
    question: 'How do I access the BioBusiness Lab Moodle platform?',
    answer: 'Click the "Login / Register" button in the navigation header. You can sign in using your institutional EU eduGAIN credentials or create a free individual learner profile to access all quizzes, live assignments, and interactive community discussion forums.',
    sort_order: 3,
  },
  {
    id: 'faq-4',
    category: 'Platform & Moodle Access',
    question: 'How does the AI Learning Assistant work inside the platform?',
    answer: 'The BioBusiness AI Assistant provides real-time guidance on bioeconomy concepts, EU green taxonomy terms, feedstock queries, and custom course recommendations. It can be accessed via the floating widget on the bottom right of the website.',
    sort_order: 4,
  },
  {
    id: 'faq-5',
    category: 'Funding & Consortium',
    question: 'Is there any commercial fee for downloading toolkits or models?',
    answer: 'No. Under the open-access mandate of the Erasmus+ programme, all course materials, business model canvases, spreadsheet templates, and policy briefs are free for personal, educational, and commercial entrepreneurial use under Creative Commons CC BY-SA 4.0.',
    sort_order: 5,
  },
  {
    id: 'faq-6',
    category: 'Funding & Consortium',
    question: 'How can my organisation or university join as an associate partner?',
    answer: 'We welcome regional bioeconomy clusters, innovation hubs, incubators, and industry associations. Reach out through our Contact page to inquire about becoming an Associated Partner for student exchange and pilot testing.',
    sort_order: 6,
  },
];

// Contact Messages
let contactMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Dr. Elena Rossi',
    email: 'elena.rossi@agribio-innovations.it',
    subject: 'Associated Partner Inquiry for Regional Agritech Hub',
    message: 'We represent a cluster of 45 bio-refinery suppliers in Emilia-Romagna and would like to integrate the BioBusiness Lab curriculum into our spring accelerator cohort. Please advise on institutional onboarding.',
    status: 'new',
    created_at: '2026-03-18T14:22:00Z',
  },
  {
    id: 'msg-2',
    name: 'Markus Lindholm',
    email: 'markus.l@nordic-biopolymer.fi',
    subject: 'Feedback on Biomass Valuation Spreadsheet Model',
    message: 'The techno-economic feasibility template downloaded from your resources section was exceptionally thorough. We successfully used it for our Seed round grant application with Business Finland.',
    status: 'read',
    created_at: '2026-03-12T09:15:00Z',
  },
];

// Site Settings
let siteSettings: SiteSetting[] = [
  { id: 'set-1', key: 'site_title', value: 'BioBusiness Lab' },
  { id: 'set-2', key: 'project_full_name', value: 'The BioBusiness Catalyst: Empowering Entrepreneurs for a Sustainable Bioeconomy' },
  { id: 'set-3', key: 'moodle_login_url', value: 'https://moodle.biobusinesscatalyst.eu/login' },
  { id: 'set-4', key: 'ai_widget_enabled', value: 'true' },
  { id: 'set-5', key: 'contact_email', value: 'contact@biobusinesscatalyst.eu' },
  { id: 'set-6', key: 'project_code', value: '2023-1-EL01-KA220-HED-000159428' },
  { id: 'set-7', key: 'eu_disclaimer_text', value: 'Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.' },
  { id: 'set-8', key: 'logo_url', value: '' },
  { id: 'set-9', key: 'show_site_title', value: 'true' },
  { id: 'set-10', key: 'show_site_subtitle', value: 'true' },
  { id: 'set-11', key: 'logo_height', value: '36' },
];

// Relational DB Helper Methods
export const db = {
  // Categories
  getCategories: (type?: string): Category[] => {
    if (type) return categories.filter(c => c.type === type);
    return [...categories];
  },
  getCategoryById: (id: string): Category | undefined => categories.find(c => c.id === id),
  createCategory: (data: Omit<Category, 'id'>): Category => {
    const item: Category = {
      ...data,
      id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      created_at: new Date().toISOString(),
    };
    categories.push(item);
    return item;
  },
  updateCategory: (id: string, updates: Partial<Category>): Category | null => {
    const idx = categories.findIndex(c => c.id === id);
    if (idx === -1) return null;
    categories[idx] = { ...categories[idx], ...updates };
    return categories[idx];
  },
  deleteCategory: (id: string): boolean => {
    const initialLen = categories.length;
    categories = categories.filter(c => c.id !== id);
    return categories.length < initialLen;
  },

  // Pages
  getPages: (): Page[] => [...pages],
  getPageBySlug: (slug: string): HydratedPage | null => {
    const page = pages.find(p => p.slug === slug);
    if (!page) return null;
    const sections = pageSections
      .filter(s => s.page_id === page.id)
      .sort((a, b) => a.sort_order - b.sort_order);
    return { ...page, sections };
  },
  updatePage: (id: string, updates: Partial<Page>): Page | null => {
    const idx = pages.findIndex(p => p.id === id);
    if (idx === -1) return null;
    pages[idx] = { ...pages[idx], ...updates };
    return pages[idx];
  },
  getPageSections: (pageId: string): PageSection[] => {
    return pageSections
      .filter(s => s.page_id === pageId)
      .sort((a, b) => a.sort_order - b.sort_order);
  },
  updatePageSection: (id: string, updates: Partial<PageSection>): PageSection | null => {
    const idx = pageSections.findIndex(s => s.id === id);
    if (idx === -1) return null;
    pageSections[idx] = { ...pageSections[idx], ...updates };
    return pageSections[idx];
  },
  reorderPageSections: (pageId: string, orderedIds: string[]): PageSection[] => {
    orderedIds.forEach((id, index) => {
      const sec = pageSections.find(s => s.id === id && s.page_id === pageId);
      if (sec) sec.sort_order = index + 1;
    });
    return db.getPageSections(pageId);
  },

  // News & Events
  getNews: (status?: 'draft' | 'published', categoryId?: string): HydratedNewsEvent[] => {
    let list = [...newsEvents];
    if (status) list = list.filter(n => n.status === status);
    if (categoryId) list = list.filter(n => n.category_id === categoryId);
    return list.map(item => {
      const cat = categories.find(c => c.id === item.category_id);
      return { ...item, category_name: cat?.name };
    });
  },
  getNewsById: (id: string): HydratedNewsEvent | null => {
    const item = newsEvents.find(n => n.id === id);
    if (!item) return null;
    const cat = categories.find(c => c.id === item.category_id);
    return { ...item, category_name: cat?.name };
  },
  getNewsBySlug: (slug: string): HydratedNewsEvent | null => {
    const item = newsEvents.find(n => n.slug === slug);
    if (!item) return null;
    const cat = categories.find(c => c.id === item.category_id);
    return { ...item, category_name: cat?.name };
  },
  createNews: (data: Omit<NewsEvent, 'id'>): NewsEvent => {
    const newItem: NewsEvent = {
      ...data,
      id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };
    newsEvents.unshift(newItem);
    return newItem;
  },
  updateNews: (id: string, updates: Partial<NewsEvent>): NewsEvent | null => {
    const idx = newsEvents.findIndex(n => n.id === id);
    if (idx === -1) return null;
    newsEvents[idx] = { ...newsEvents[idx], ...updates };
    return newsEvents[idx];
  },
  deleteNews: (id: string): boolean => {
    const initialLen = newsEvents.length;
    newsEvents = newsEvents.filter(n => n.id !== id);
    return newsEvents.length < initialLen;
  },

  // Courses
  getCourses: (categoryId?: string, level?: string): HydratedCourse[] => {
    let list = [...courses];
    if (categoryId) list = list.filter(c => c.category_id === categoryId);
    if (level && level !== 'all') list = list.filter(c => c.level === level);
    return list.map(course => {
      const cat = categories.find(c => c.id === course.category_id);
      return { ...course, category_name: cat?.name };
    });
  },
  getCourseById: (id: string): HydratedCourse | null => {
    const item = courses.find(c => c.id === id);
    if (!item) return null;
    const cat = categories.find(c => c.id === item.category_id);
    return { ...item, category_name: cat?.name };
  },
  createCourse: (data: Omit<Course, 'id'>): Course => {
    const newCourse: Course = {
      ...data,
      id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };
    courses.push(newCourse);
    return newCourse;
  },
  updateCourse: (id: string, updates: Partial<Course>): Course | null => {
    const idx = courses.findIndex(c => c.id === id);
    if (idx === -1) return null;
    courses[idx] = { ...courses[idx], ...updates };
    return courses[idx];
  },
  deleteCourse: (id: string): boolean => {
    const initialLen = courses.length;
    courses = courses.filter(c => c.id !== id);
    return courses.length < initialLen;
  },

  // Resources
  getResources: (categoryId?: string, resourceType?: string): HydratedResource[] => {
    let list = [...resources];
    if (categoryId) list = list.filter(r => r.category_id === categoryId);
    if (resourceType && resourceType !== 'all') list = list.filter(r => r.resource_type === resourceType);
    return list.map(res => {
      const cat = categories.find(c => c.id === res.category_id);
      return { ...res, category_name: cat?.name };
    });
  },
  getResourceById: (id: string): HydratedResource | null => {
    const item = resources.find(r => r.id === id);
    if (!item) return null;
    const cat = categories.find(c => c.id === item.category_id);
    return { ...item, category_name: cat?.name };
  },
  createResource: (data: Omit<Resource, 'id'>): Resource => {
    const newRes: Resource = {
      ...data,
      id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      download_count: data.download_count || 0,
    };
    resources.push(newRes);
    return newRes;
  },
  updateResource: (id: string, updates: Partial<Resource>): Resource | null => {
    const idx = resources.findIndex(r => r.id === id);
    if (idx === -1) return null;
    resources[idx] = { ...resources[idx], ...updates };
    return resources[idx];
  },
  deleteResource: (id: string): boolean => {
    const initialLen = resources.length;
    resources = resources.filter(r => r.id !== id);
    return resources.length < initialLen;
  },
  incrementDownload: (id: string): number | null => {
    const item = resources.find(r => r.id === id);
    if (!item) return null;
    item.download_count += 1;
    return item.download_count;
  },

  // Partners
  getPartners: (): Partner[] => {
    return [...partners].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  },
  createPartner: (data: Omit<Partner, 'id'>): Partner => {
    const newPartner: Partner = {
      ...data,
      id: `partner-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      sort_order: data.sort_order || partners.length + 1,
    };
    partners.push(newPartner);
    return newPartner;
  },
  updatePartner: (id: string, updates: Partial<Partner>): Partner | null => {
    const idx = partners.findIndex(p => p.id === id);
    if (idx === -1) return null;
    partners[idx] = { ...partners[idx], ...updates };
    return partners[idx];
  },
  deletePartner: (id: string): boolean => {
    const initialLen = partners.length;
    partners = partners.filter(p => p.id !== id);
    return partners.length < initialLen;
  },
  reorderPartners: (orderedIds: string[]): Partner[] => {
    orderedIds.forEach((id, idx) => {
      const p = partners.find(item => item.id === id);
      if (p) p.sort_order = idx + 1;
    });
    return db.getPartners();
  },

  // FAQs
  getFaqs: (category?: string): Faq[] => {
    let list = [...faqs].sort((a, b) => a.sort_order - b.sort_order);
    if (category && category !== 'all') list = list.filter(f => f.category === category);
    return list;
  },
  createFaq: (data: Omit<Faq, 'id'>): Faq => {
    const newFaq: Faq = {
      ...data,
      id: `faq-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      sort_order: data.sort_order || faqs.length + 1,
    };
    faqs.push(newFaq);
    return newFaq;
  },
  updateFaq: (id: string, updates: Partial<Faq>): Faq | null => {
    const idx = faqs.findIndex(f => f.id === id);
    if (idx === -1) return null;
    faqs[idx] = { ...faqs[idx], ...updates };
    return faqs[idx];
  },
  deleteFaq: (id: string): boolean => {
    const initialLen = faqs.length;
    faqs = faqs.filter(f => f.id !== id);
    return faqs.length < initialLen;
  },
  reorderFaqs: (orderedIds: string[]): Faq[] => {
    orderedIds.forEach((id, idx) => {
      const f = faqs.find(item => item.id === id);
      if (f) f.sort_order = idx + 1;
    });
    return db.getFaqs();
  },

  // Contact Messages
  getMessages: (): ContactMessage[] => {
    return [...contactMessages].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },
  getContactMessages: (): ContactMessage[] => {
    return db.getMessages();
  },
  createMessage: (data: Omit<ContactMessage, 'id' | 'status' | 'created_at'>): ContactMessage => {
    const msg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      status: 'new',
      is_resolved: false,
      created_at: new Date().toISOString(),
    };
    contactMessages.unshift(msg);
    return msg;
  },
  updateMessageStatus: (id: string, status: 'new' | 'read' | 'archived'): ContactMessage | null => {
    const item = contactMessages.find(m => m.id === id);
    if (!item) return null;
    item.status = status;
    item.is_resolved = status === 'read' || status === 'archived';
    return item;
  },
  updateMessageResolved: (id: string, is_resolved: boolean): ContactMessage | null => {
    const item = contactMessages.find(m => m.id === id);
    if (!item) return null;
    item.is_resolved = is_resolved;
    item.status = is_resolved ? 'read' : 'new';
    return item;
  },
  deleteMessage: (id: string): boolean => {
    const initialLen = contactMessages.length;
    contactMessages = contactMessages.filter(m => m.id !== id);
    return contactMessages.length < initialLen;
  },

  // Site Settings
  getSettings: (): Record<string, string> => {
    const result: Record<string, string> = {};
    siteSettings.forEach(s => {
      result[s.key] = s.value;
    });
    return result;
  },
  getSiteSettings: (): SiteSettings => {
    const dict = db.getSettings();
    return {
      site_title: dict.site_title || 'BioBusiness Lab',
      project_full_name: dict.project_full_name || 'The BioBusiness Catalyst: Empowering Entrepreneurs for a Sustainable Bioeconomy',
      logo_url: dict.logo_url || '',
      show_site_title: dict.show_site_title !== 'false',
      show_site_subtitle: dict.show_site_subtitle !== 'false',
      logo_height: parseInt(dict.logo_height || '36', 10),
      moodle_login_url: dict.moodle_login_url || 'https://moodle.biobusinesscatalyst.eu/login',
      ai_widget_enabled: dict.ai_widget_enabled === 'true',
      contact_email: dict.contact_email || 'contact@biobusinesscatalyst.eu',
      project_code: dict.project_code || '2023-1-EL01-KA220-HED-000159428',
      eu_disclaimer_text: dict.eu_disclaimer_text || 'Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.',
    };
  },
  getRawSettings: (): SiteSetting[] => [...siteSettings],
  updateSetting: (key: string, value: string): boolean => {
    // Special protection: eu_disclaimer_text is read-only / protected legal field!
    if (key === 'eu_disclaimer_text') {
      return false; // locked
    }
    const item = siteSettings.find(s => s.key === key);
    if (item) {
      item.value = value;
      return true;
    }
    siteSettings.push({
      id: `set-${Date.now()}`,
      key,
      value,
    });
    return true;
  },
  updateSiteSettings: (settings: Partial<SiteSettings>): SiteSettings => {
    if (settings.site_title !== undefined) db.updateSetting('site_title', settings.site_title);
    if (settings.logo_url !== undefined) db.updateSetting('logo_url', settings.logo_url);
    if (settings.show_site_title !== undefined) db.updateSetting('show_site_title', String(settings.show_site_title));
    if (settings.show_site_subtitle !== undefined) db.updateSetting('show_site_subtitle', String(settings.show_site_subtitle));
    if (settings.logo_height !== undefined) db.updateSetting('logo_height', String(settings.logo_height));
    if (settings.moodle_login_url !== undefined) db.updateSetting('moodle_login_url', settings.moodle_login_url);
    if (settings.ai_widget_enabled !== undefined) db.updateSetting('ai_widget_enabled', String(settings.ai_widget_enabled));
    if (settings.contact_email !== undefined) db.updateSetting('contact_email', settings.contact_email);
    return db.getSiteSettings();
  },

  // Dashboard Metrics
  getMetrics: (): DashboardMetrics => {
    const totalDownloads = resources.reduce((sum, r) => sum + (r.download_count || 0), 0);
    const unreadMessages = contactMessages.filter(m => m.status === 'new').length;
    return {
      totalPages: pages.length,
      totalNews: newsEvents.length,
      totalCourses: courses.length,
      totalResources: resources.length,
      totalDownloads,
      unreadMessages,
      totalPartners: partners.length,
    };
  },
};
