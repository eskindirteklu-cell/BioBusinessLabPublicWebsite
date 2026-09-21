import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, BookOpen, ExternalLink } from 'lucide-react';
import { HydratedCourse, Category } from '../../types/schema.ts';
import { CourseCard } from '../ui/Cards.tsx';

interface CoursesViewProps {
  courses: HydratedCourse[];
  categories: Category[];
  onEnrollCourse: (course: HydratedCourse) => void;
  moodleLoginUrl?: string;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  categories,
  onEnrollCourse,
  moodleLoginUrl = 'https://moodle.biobusinesscatalyst.eu/login',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const courseCategories = useMemo(() => {
    return categories.filter(c => c.type === 'course');
  }, [categories]);

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.moodle_course_id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        selectedLevel === 'all' || c.level.toLowerCase() === selectedLevel.toLowerCase();

      const matchesCategory =
        selectedCategory === 'all' || c.category_id === selectedCategory;

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [courses, searchTerm, selectedLevel, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold text-[#007360] uppercase tracking-wider">
          European Digital Curriculum
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#333333] mt-2 mb-4">
          Courses & Capacity-Building Modules
        </h1>
        <p className="text-base text-[#333333]/85 leading-relaxed">
          Explore accredited, self-paced bioeconomy training modules. Hosted on our dedicated EU Moodle learning platform, these courses provide verifiable digital credentials, practical exercises, and direct access to instructor office hours.
        </p>
      </div>

      {/* Filter Bar */}
      <motion.div
        whileHover={{ y: -1, transition: { duration: 0.15 } }}
        className="bg-[#FFFBF3] border border-[#007360]/15 rounded-2xl p-5 shadow-2xs space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Search input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-[#333333]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by topic, Moodle ID, keyword..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 transition-all"
            />
          </div>

          {/* Level Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 cursor-pointer"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#007360]/20 rounded-lg text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30 cursor-pointer"
            >
              <option value="all">All Course Clusters</option>
              {courseCategories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Stats / Clear */}
        <div className="flex items-center justify-between text-xs text-[#333333]/70 pt-2 border-t border-[#007360]/10">
          <span>
            Showing <strong>{filteredCourses.length}</strong> of{' '}
            <strong>{courses.length}</strong> modules
          </span>
          {(searchTerm || selectedLevel !== 'all' || selectedCategory !== 'all') && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedLevel('all');
                setSelectedCategory('all');
              }}
              className="text-[#007360] font-semibold hover:underline cursor-pointer"
            >
              Reset Filters
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCourses.map(course => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <CourseCard course={course} onEnroll={onEnrollCourse} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white border border-[#007360]/15 rounded-2xl p-8 space-y-3"
        >
          <BookOpen className="w-10 h-10 text-[#007360]/40 mx-auto" />
          <h3 className="text-base font-bold text-[#333333]">No matching courses found</h3>
          <p className="text-xs text-[#333333]/70 max-w-sm mx-auto">
            Try adjusting your search query or reset your filters to browse the complete Erasmus+ catalog.
          </p>
        </motion.div>
      )}
    </div>
  );
};
