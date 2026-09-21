/**
 * Relational database schema types for BioBusiness Lab
 * Designed to easily map to MySQL/PostgreSQL relational tables
 */

export interface Page {
  id: string; // UUID primary key
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  locale: string;
  is_published: boolean;
}

export interface PageSection {
  id: string; // UUID primary key
  page_id: string; // Foreign key -> pages.id
  section_key: string;
  content_json: string; // serialized string containing section parameters
  sort_order: number;
}

export type CategoryType = 'news' | 'resource' | 'course';

export interface Category {
  id: string; // UUID primary key
  name: string;
  slug?: string;
  type: CategoryType;
  created_at?: string;
}

export interface NewsEvent {
  id: string; // UUID primary key
  category_id: string; // Foreign key -> categories.id
  title: string;
  slug: string;
  body_rich_text: string;
  cover_image_url: string;
  event_date: string | null; // ISO Date string or null for news
  location: string | null;
  status?: 'draft' | 'published';
  published_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: string; // UUID primary key
  category_id: string; // Foreign key -> categories.id
  title: string;
  slug?: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  moodle_course_id: string;
  enrollment_url: string;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Resource {
  id: string; // UUID primary key
  category_id: string; // Foreign key -> categories.id
  title: string;
  description: string;
  file_url: string;
  resource_type: 'PDF' | 'Toolkit' | 'Case Study' | 'Policy Brief' | 'Slide Deck' | 'Report';
  download_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface Partner {
  id: string; // UUID primary key
  name: string;
  logo_url: string;
  country: string;
  role_description: string;
  website_url: string;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Faq {
  id: string; // UUID primary key
  category: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string; // UUID primary key
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'new' | 'read' | 'archived';
  is_resolved?: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: string; // UUID primary key
  key: string;
  value: string;
}

export interface SiteSettings {
  site_title: string;
  project_full_name: string;
  logo_url?: string;
  show_site_title?: boolean;
  show_site_subtitle?: boolean;
  logo_height?: number;
  moodle_login_url: string;
  ai_widget_enabled: boolean;
  contact_email: string;
  project_code: string;
  eu_disclaimer_text: string;
}

// Joined / hydrated representations for frontend views and API responses
export interface HydratedNewsEvent extends NewsEvent {
  category_name?: string;
}

export interface HydratedCourse extends Course {
  category_name?: string;
}

export interface HydratedResource extends Resource {
  category_name?: string;
}

export interface HydratedPage extends Page {
  sections?: PageSection[];
}

export interface DashboardMetrics {
  totalPages: number;
  totalNews: number;
  totalCourses: number;
  totalResources: number;
  totalDownloads: number;
  unreadMessages: number;
  totalPartners: number;
}
