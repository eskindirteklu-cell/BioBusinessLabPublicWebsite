import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { db } from './src/lib/db.ts';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.warn('Failed to initialize Gemini AI client:', e);
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // ----------------------------------------------------
  // PUBLIC API ENDPOINTS
  // ----------------------------------------------------
  
  // GET /api/public/pages/:slug
  app.get('/api/public/pages/:slug', (req, res) => {
    const page = db.getPageBySlug(req.params.slug);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(page);
  });

  // GET /api/public/news
  app.get('/api/public/news', (req, res) => {
    const categoryId = req.query.category as string | undefined;
    const news = db.getNews('published', categoryId);
    res.json(news);
  });

  // GET /api/public/news/:slug
  app.get('/api/public/news/:slug', (req, res) => {
    const item = db.getNewsBySlug(req.params.slug);
    if (!item) {
      return res.status(404).json({ error: 'News article not found' });
    }
    res.json(item);
  });

  // GET /api/public/courses
  app.get('/api/public/courses', (req, res) => {
    const categoryId = req.query.category as string | undefined;
    const level = req.query.level as string | undefined;
    const courses = db.getCourses(categoryId, level);
    res.json(courses);
  });

  // GET /api/public/resources
  app.get('/api/public/resources', (req, res) => {
    const categoryId = req.query.category as string | undefined;
    const type = req.query.type as string | undefined;
    const resources = db.getResources(categoryId, type);
    res.json(resources);
  });

  // POST /api/public/resources/:id/download
  app.post('/api/public/resources/:id/download', (req, res) => {
    const newCount = db.incrementDownload(req.params.id);
    if (newCount === null) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json({ success: true, download_count: newCount });
  });

  // GET /api/public/partners
  app.get('/api/public/partners', (req, res) => {
    const partners = db.getPartners();
    res.json(partners);
  });

  // GET /api/public/faqs
  app.get('/api/public/faqs', (req, res) => {
    const category = req.query.category as string | undefined;
    const faqs = db.getFaqs(category);
    res.json(faqs);
  });

  // GET /api/public/settings
  app.get('/api/public/settings', (req, res) => {
    const settings = db.getSettings();
    res.json(settings);
  });

  // GET /api/public/bootstrap (returns all relational entities in a single atomic payload)
  app.get('/api/public/bootstrap', (req, res) => {
    res.json({
      settings: db.getSiteSettings(),
      categories: db.getCategories(),
      courses: db.getCourses(),
      news: db.getNews(),
      resources: db.getResources(),
      partners: db.getPartners(),
      faqs: db.getFaqs(),
      messages: db.getMessages(),
    });
  });

  // POST /api/contact
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const created = db.createMessage({ name, email, subject, message });
    res.status(201).json({ success: true, message: created });
  });

  // POST /api/ai/assistant
  app.post('/api/ai/assistant', async (req, res) => {
    const { prompt, conversation } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const ai = getAI();
    const systemPrompt = `You are the specialized "BioBusiness AI Learning Assistant" for the Erasmus+-funded project "The BioBusiness Catalyst: Empowering Entrepreneurs for a Sustainable Bioeconomy" (Project Ref: 2023-1-EL01-KA220-HED-000159428).
Your mission is to support higher education students, researchers, bio-innovators, and entrepreneurs across Europe.
Knowledge domain:
- European circular bioeconomy, biomass valorisation, bio-refinery cascade utilization hierarchies.
- EU policies: European Green Deal, Circular Economy Action Plan, EU Bioeconomy Strategy, EU Green Claims Directive, and ESG taxonomy.
- Platform offerings: 12 open-access self-paced modules integrated with Moodle LMS (MDL-BIO-101 to 305), venture toolkits (Bio-Venture Business Model Canvas, Techno-Economic Feasibility spreadsheet), partner institutions (NTUA, UNIBO, VTT Finland, Circular Bioeconomy Alliance Iberia, EuBioNet, Fraunhofer IGB).
- Funding streams: Horizon Europe, EIC Accelerator, LIFE, Interreg, and blended finance.
Tone: Professional, supportive, academic yet entrepreneurial, concise, and structured. Use Markdown formatting.`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${systemPrompt}\n\nUser Question: ${prompt}`,
        });

        return res.json({
          reply: response.text || 'I could not formulate a response at this moment.',
        });
      } catch (err: any) {
        console.error('Gemini API call failed:', err?.message || err);
      }
    }

    // Fallback response with domain intelligence
    const lower = prompt.toLowerCase();
    let reply = '';
    if (lower.includes('course') || lower.includes('moodle') || lower.includes('learn')) {
      reply = `**BioBusiness Lab Course Pathways:**\n\nOur open digital curriculum is hosted on the EU Moodle LMS platform:\n- **Introduction to the European Circular Bioeconomy (MDL-BIO-101)**: Foundational principles of biological cycles and resource efficiency.\n- **Venture Building & Pitching for Bio-Innovators (MDL-BIO-202)**: Techno-economic modelling and investor pitch development.\n- **Eco-Design & Life Cycle Assessment (LCA) in Practice (MDL-BIO-303)**: ISO 14040-compliant LCA and packaging eco-design.\n\nAll courses are open-access and award verifiable digital European ECTS certificates. You can enroll by clicking **"Login / Register"** in the top navigation bar.`;
    } else if (lower.includes('funding') || lower.includes('grant') || lower.includes('capital') || lower.includes('invest')) {
      reply = `**Bio-Venture Funding Streams in Europe:**\n\nFor sustainable bioeconomy startups, we recommend exploring:\n1. **EIC Accelerator**: Blended finance up to €2.5M grant + €15M equity for TRL 5-8 innovations.\n2. **Horizon Europe Cluster 6**: Circular economy and bioeconomy research consortium calls.\n3. **LIFE Programme**: Demonstration of close-to-market circular solutions.\n\nCheck out our downloadable **Funding Roadmap 2026-2027** in the Resources section for active deadlines and eligibility matrices.`;
    } else if (lower.includes('partner') || lower.includes('consortium') || lower.includes('university')) {
      reply = `**Consortium Partners:**\nThe project is led by the **National Technical University of Athens (NTUA)** in partnership with **University of Bologna (UNIBO)**, **VTT Technical Research Centre of Finland**, **Circular Bioeconomy Alliance Iberia (Spain)**, **European Bioeconomy Network (EuBioNet, Belgium)**, and **Fraunhofer IGB (Germany)**.`;
    } else {
      reply = `Thank you for consulting the **BioBusiness AI Learning Assistant**. The BioBusiness Catalyst project supports aspiring European founders transforming bio-based innovations into sustainable, viable enterprises.\n\nHow can I help you today? You can ask me about:\n- Recommended course modules on our Moodle platform\n- Biomass residue valorisation & Life Cycle Assessments (LCA)\n- Business Model Canvas adaptation for circular ventures\n- EU Green Taxonomy and compliance guidelines`;
    }

    res.json({ reply });
  });

  // ----------------------------------------------------
  // ADMIN CMS API ENDPOINTS
  // ----------------------------------------------------

  // GET /api/admin/metrics
  app.get('/api/admin/metrics', (req, res) => {
    res.json(db.getMetrics());
  });

  // Pages & Sections
  app.get('/api/admin/pages', (req, res) => {
    const pages = db.getPages();
    res.json(pages);
  });

  app.put('/api/admin/pages/:id', (req, res) => {
    const updated = db.updatePage(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Page not found' });
    res.json(updated);
  });

  app.get('/api/admin/pages/:id/sections', (req, res) => {
    const sections = db.getPageSections(req.params.id);
    res.json(sections);
  });

  app.put('/api/admin/sections/:id', (req, res) => {
    const updated = db.updatePageSection(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Section not found' });
    res.json(updated);
  });

  app.post('/api/admin/pages/:id/reorder-sections', (req, res) => {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
    const sections = db.reorderPageSections(req.params.id, orderedIds);
    res.json(sections);
  });

  // News Manager CRUD
  app.get('/api/admin/news', (req, res) => {
    const news = db.getNews();
    res.json(news);
  });

  app.post('/api/admin/news', (req, res) => {
    const created = db.createNews(req.body);
    res.status(201).json(created);
  });

  app.put('/api/admin/news/:id', (req, res) => {
    const updated = db.updateNews(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'News item not found' });
    res.json(updated);
  });

  app.delete('/api/admin/news/:id', (req, res) => {
    const ok = db.deleteNews(req.params.id);
    res.json({ success: ok });
  });

  // Courses Manager CRUD
  app.get('/api/admin/courses', (req, res) => {
    const courses = db.getCourses();
    res.json(courses);
  });

  app.post('/api/admin/courses', (req, res) => {
    const created = db.createCourse(req.body);
    res.status(201).json(created);
  });

  app.put('/api/admin/courses/:id', (req, res) => {
    const updated = db.updateCourse(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Course not found' });
    res.json(updated);
  });

  app.delete('/api/admin/courses/:id', (req, res) => {
    const ok = db.deleteCourse(req.params.id);
    res.json({ success: ok });
  });

  // Resources Manager CRUD
  app.get('/api/admin/resources', (req, res) => {
    const resources = db.getResources();
    res.json(resources);
  });

  app.post('/api/admin/resources', (req, res) => {
    const created = db.createResource(req.body);
    res.status(201).json(created);
  });

  app.put('/api/admin/resources/:id', (req, res) => {
    const updated = db.updateResource(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Resource not found' });
    res.json(updated);
  });

  app.delete('/api/admin/resources/:id', (req, res) => {
    const ok = db.deleteResource(req.params.id);
    res.json({ success: ok });
  });

  // Partners Manager CRUD
  app.get('/api/admin/partners', (req, res) => {
    const partners = db.getPartners();
    res.json(partners);
  });

  app.post('/api/admin/partners', (req, res) => {
    const created = db.createPartner(req.body);
    res.status(201).json(created);
  });

  app.put('/api/admin/partners/:id', (req, res) => {
    const updated = db.updatePartner(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Partner not found' });
    res.json(updated);
  });

  app.delete('/api/admin/partners/:id', (req, res) => {
    const ok = db.deletePartner(req.params.id);
    res.json({ success: ok });
  });

  app.post('/api/admin/partners/reorder', (req, res) => {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
    const reordered = db.reorderPartners(orderedIds);
    res.json(reordered);
  });

  // FAQs Manager CRUD
  app.get('/api/admin/faqs', (req, res) => {
    const faqs = db.getFaqs();
    res.json(faqs);
  });

  app.post('/api/admin/faqs', (req, res) => {
    const created = db.createFaq(req.body);
    res.status(201).json(created);
  });

  app.put('/api/admin/faqs/:id', (req, res) => {
    const updated = db.updateFaq(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Faq not found' });
    res.json(updated);
  });

  app.delete('/api/admin/faqs/:id', (req, res) => {
    const ok = db.deleteFaq(req.params.id);
    res.json({ success: ok });
  });

  app.post('/api/admin/faqs/reorder', (req, res) => {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) return res.status(400).json({ error: 'orderedIds array required' });
    const reordered = db.reorderFaqs(orderedIds);
    res.json(reordered);
  });

  // Contact Inbox
  app.get('/api/admin/messages', (req, res) => {
    const messages = db.getMessages();
    res.json(messages);
  });

  app.patch('/api/admin/messages/:id/status', (req, res) => {
    const { is_resolved, status } = req.body;
    let updated;
    if (typeof is_resolved === 'boolean') {
      updated = db.updateMessageResolved(req.params.id, is_resolved);
    } else if (status) {
      updated = db.updateMessageStatus(req.params.id, status);
    }
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json(updated);
  });

  app.patch('/api/admin/messages/:id', (req, res) => {
    const { status, is_resolved } = req.body;
    let updated;
    if (typeof is_resolved === 'boolean') {
      updated = db.updateMessageResolved(req.params.id, is_resolved);
    } else if (status) {
      updated = db.updateMessageStatus(req.params.id, status);
    }
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json(updated);
  });

  app.delete('/api/admin/messages/:id', (req, res) => {
    const ok = db.deleteMessage(req.params.id);
    res.json({ success: ok });
  });

  // Settings
  app.get('/api/admin/settings', (req, res) => {
    res.json(db.getSiteSettings());
  });

  app.put('/api/admin/settings', (req, res) => {
    const body = req.body;
    if (body.key && body.value !== undefined) {
      if (body.key === 'eu_disclaimer_text') {
        return res.status(403).json({ error: 'EU Disclaimer text is a protected legal field and cannot be edited.' });
      }
      const ok = db.updateSetting(body.key, body.value);
      return res.json({ success: ok, settings: db.getSiteSettings() });
    }

    // Full object update
    const updated = db.updateSiteSettings(body);
    res.json(updated);
  });

  // Logo Upload / Update
  app.post('/api/admin/upload-logo', (req, res) => {
    const { logo_data, show_site_title, show_site_subtitle, logo_height } = req.body;
    if (logo_data !== undefined) {
      db.updateSetting('logo_url', logo_data);
    }
    if (show_site_title !== undefined) {
      db.updateSetting('show_site_title', String(show_site_title));
    }
    if (show_site_subtitle !== undefined) {
      db.updateSetting('show_site_subtitle', String(show_site_subtitle));
    }
    if (logo_height !== undefined) {
      db.updateSetting('logo_height', String(logo_height));
    }
    res.json({ success: true, settings: db.getSiteSettings() });
  });

  // Categories CRUD
  app.get('/api/categories', (req, res) => {
    res.json(db.getCategories());
  });

  app.get('/api/admin/categories', (req, res) => {
    res.json(db.getCategories());
  });

  app.post('/api/admin/categories', (req, res) => {
    const created = db.createCategory(req.body);
    res.status(201).json(created);
  });

  app.put('/api/admin/categories/:id', (req, res) => {
    const updated = db.updateCategory(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json(updated);
  });

  app.delete('/api/admin/categories/:id', (req, res) => {
    const ok = db.deleteCategory(req.params.id);
    res.json({ success: ok });
  });

  // ----------------------------------------------------
  // VITE & STATIC SPA FALLBACK
  // ----------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BioBusiness Lab server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
