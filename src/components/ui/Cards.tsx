import React from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Download,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Globe,
  FileText,
  Clock,
} from 'lucide-react';
import { HydratedCourse, HydratedNewsEvent, HydratedResource, Partner } from '../../types/schema.ts';
import { Button } from './Buttons.tsx';

/**
 * Course Card Component
 */
export const CourseCard: React.FC<{
  course: HydratedCourse;
  onEnroll?: (course: HydratedCourse) => void;
}> = ({ course, onEnroll }) => {
  const levelColors: Record<string, string> = {
    Beginner: 'bg-[#38B942]/15 text-[#008C45] border-[#38B942]/30',
    Intermediate: 'bg-[#FF9F00]/15 text-[#B26B00] border-[#FF9F00]/30',
    Advanced: 'bg-[#0057A9]/15 text-[#0057A9] border-[#0057A9]/30',
    'All Levels': 'bg-[#43AB98]/15 text-[#007360] border-[#43AB98]/30',
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="flex flex-col justify-between bg-white border border-[#007360]/15 rounded-xl p-5 shadow-2xs hover:shadow-md transition-shadow duration-200 group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
              levelColors[course.level] || levelColors['All Levels']
            }`}
          >
            {course.level}
          </span>
          {course.is_featured && (
            <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FFDE00]/30 text-[#8A7100] border border-[#FFDE00]/50">
              <Award className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-[#333333] group-hover:text-[#007360] transition-colors mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-xs text-[#333333]/75 leading-relaxed line-clamp-3 mb-4">
          {course.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#007360]/10 flex flex-col gap-3">
        <div className="flex items-center justify-between text-[11px] text-[#333333]/65">
          <span className="flex items-center gap-1 font-mono font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#007360]" />
            {course.moodle_course_id}
          </span>
          {course.category_name && (
            <span className="text-right truncate max-w-[140px] text-[#007360] font-medium">
              {course.category_name}
            </span>
          )}
        </div>

        <a
          href={course.enrollment_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onEnroll && onEnroll(course)}
          className="w-full"
        >
          <Button
            variant="primary"
            size="sm"
            className="w-full justify-center"
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Enroll in Moodle
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

/**
 * News & Events Card Component
 */
export const NewsCard: React.FC<{
  item: HydratedNewsEvent;
  onReadMore: (item: HydratedNewsEvent) => void;
}> = ({ item, onReadMore }) => {
  const isEvent = Boolean(item.event_date);

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      onClick={() => onReadMore(item)}
      className="cursor-pointer flex flex-col bg-white border border-[#007360]/15 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-shadow duration-200 group"
    >
      <div className="relative h-44 w-full bg-[#FFFBF3] overflow-hidden">
        <img
          src={item.cover_image_url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow-xs ${
              isEvent
                ? 'bg-[#FF9F00] text-white'
                : 'bg-[#007360] text-white'
            }`}
          >
            {isEvent ? 'Upcoming Event' : 'Project News'}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-[#333333]/60 mb-2">
            {isEvent ? (
              <span className="flex items-center gap-1 font-medium text-[#007360]">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(item.event_date!).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {new Date(item.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            )}
            {item.location && (
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#43AB98]" />
                {item.location}
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-[#333333] group-hover:text-[#007360] transition-colors mb-2 line-clamp-2">
            {item.title}
          </h3>

          <p className="text-xs text-[#333333]/75 leading-relaxed line-clamp-3 mb-4">
            {item.body_rich_text}
          </p>
        </div>

        <div className="pt-3 border-t border-[#007360]/10 flex items-center justify-between">
          <span className="text-xs text-[#007360] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read details &rarr;
          </span>
          {item.category_name && (
            <span className="text-[11px] text-[#333333]/60 font-medium">
              {item.category_name}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Resource Card Component
 */
export const ResourceCard: React.FC<{
  resource: HydratedResource;
  onDownload: (resource: HydratedResource) => void;
  isDownloading?: boolean;
}> = ({ resource, onDownload, isDownloading = false }) => {
  const typeBadges: Record<string, string> = {
    Toolkit: 'bg-[#007360]/15 text-[#007360] border-[#007360]/30',
    'Policy Brief': 'bg-[#0057A9]/15 text-[#0057A9] border-[#0057A9]/30',
    'Case Study': 'bg-[#008C45]/15 text-[#008C45] border-[#008C45]/30',
    Report: 'bg-[#FF9F00]/15 text-[#B26B00] border-[#FF9F00]/30',
    'Slide Deck': 'bg-[#43AB98]/15 text-[#007360] border-[#43AB98]/30',
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="flex flex-col justify-between bg-white border border-[#007360]/15 rounded-xl p-5 shadow-2xs hover:shadow-md transition-shadow duration-200"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
              typeBadges[resource.resource_type] || 'bg-[#007360]/15 text-[#007360]'
            }`}
          >
            {resource.resource_type}
          </span>
          <span className="text-[11px] font-mono text-[#333333]/60">
            {resource.download_count} downloads
          </span>
        </div>

        <h3 className="text-base font-bold text-[#333333] mb-2 flex items-start gap-2">
          <FileText className="w-4 h-4 text-[#007360] shrink-0 mt-0.5" />
          <span className="line-clamp-2">{resource.title}</span>
        </h3>

        <p className="text-xs text-[#333333]/75 leading-relaxed line-clamp-3 mb-4">
          {resource.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#007360]/10 flex items-center justify-between gap-3">
        <span className="text-[11px] text-[#007360] font-medium truncate">
          {resource.category_name || 'Open Knowledge'}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onDownload(resource)}
          disabled={isDownloading}
          icon={<Download className="w-3.5 h-3.5" />}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </Button>
      </div>
    </motion.div>
  );
};

/**
 * Partner Card Component
 */
export const PartnerCard: React.FC<{
  partner: Partner;
}> = ({ partner }) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className="flex flex-col justify-between bg-white border border-[#007360]/15 rounded-xl p-5 shadow-2xs hover:shadow-md transition-shadow duration-200 text-left"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#43AB98]/15 text-[#007360] border border-[#43AB98]/30">
            {partner.country}
          </span>
        </div>

        <h3 className="text-base font-bold text-[#333333] mb-2">
          {partner.name}
        </h3>

        <p className="text-xs text-[#333333]/75 leading-relaxed mb-4">
          {partner.role_description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#007360]/10">
        <a
          href={partner.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007360] hover:text-[#43AB98] transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          Visit Institutional Portal
        </a>
      </div>
    </motion.div>
  );
};

/**
 * Metric Card Component for Admin Dashboard
 */
export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  badge?: string;
}> = ({ title, value, icon, subtitle, badge }) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.15, ease: 'easeOut' } }}
      className="bg-white border border-[#007360]/15 rounded-xl p-5 shadow-2xs hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#333333]/70">
          {title}
        </span>
        <div className="w-9 h-9 rounded-lg bg-[#007360]/10 flex items-center justify-center text-[#007360]">
          {icon}
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-extrabold text-[#333333] mb-1">
        {value}
      </div>
      {(subtitle || badge) && (
        <div className="flex items-center justify-between text-xs text-[#333333]/60 pt-1">
          {subtitle && <span>{subtitle}</span>}
          {badge && (
            <span className="px-2 py-0.5 rounded-md bg-[#43AB98]/15 text-[#007360] font-semibold">
              {badge}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
