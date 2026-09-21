import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Check, Award, BookOpen } from 'lucide-react';
import { Course, Category } from '../../types/schema.ts';
import { Button } from '../ui/Buttons.tsx';
import { Modal } from '../ui/Modal.tsx';

interface CoursesManagerProps {
  courses: Course[];
  categories: Category[];
  onRefresh: () => Promise<void>;
}

export const CoursesManager: React.FC<CoursesManagerProps> = ({
  courses,
  categories,
  onRefresh,
}) => {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const courseCategories = categories.filter(c => c.type === 'course');

  const emptyCourse: Course = {
    id: '',
    title: '',
    category_id: courseCategories[0]?.id || '',
    level: 'Beginner',
    description: '',
    moodle_course_id: 'BB-BIO-NEW',
    enrollment_url: 'https://moodle.biobusinesscatalyst.eu/course/view.php?id=100',
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<Course>(emptyCourse);

  const handleOpenCreate = () => {
    setIsNew(true);
    setFormData({ ...emptyCourse, category_id: courseCategories[0]?.id || '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Course) => {
    setIsNew(false);
    setEditingCourse(c);
    setFormData(c);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course from the catalog?')) return;
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await onRefresh();
      } else {
        alert('Failed to delete course.');
      }
    } catch (e) {
      alert('Network error deleting course.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = isNew ? '/api/admin/courses' : `/api/admin/courses/${formData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        await onRefresh();
      } else {
        alert('Failed to save course changes.');
      }
    } catch (err) {
      alert('Error saving course.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#333333]">Courses & Curricula Manager</h2>
          <p className="text-xs text-[#333333]/70 mt-1">
            Create, edit, and link accredited bioeconomy courses to European Moodle LMS IDs.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Course
        </Button>
      </div>

      {/* Courses Table */}
      <div className="bg-white border border-[#007360]/15 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FFFBF3] border-b border-[#007360]/15 text-[#333333] uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Course Title & ID</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Level</th>
                <th className="px-5 py-3.5">Featured</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#007360]/10">
              {courses.map(course => {
                const category = categories.find(c => c.id === course.category_id);
                return (
                  <tr key={course.id} className="hover:bg-[#FFFBF3]/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-[#333333] text-sm">{course.title}</div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#333333]/60 font-mono">
                        <BookOpen className="w-3 h-3 text-[#007360]" />
                        <span>{course.moodle_course_id}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#007360] font-medium">
                      {category?.name || 'Unassigned'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#007360]/10 text-[#007360] font-semibold text-[11px]">
                        {course.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {course.is_featured ? (
                        <span className="flex items-center gap-1 text-[#8A7100] font-semibold text-[11px]">
                          <Award className="w-3.5 h-3.5 text-[#FFDE00]" /> Yes
                        </span>
                      ) : (
                        <span className="text-[#333333]/40">No</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(course)}
                        className="p-1.5 rounded-md text-[#007360] hover:bg-[#007360]/10 transition-colors"
                        title="Edit Course"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="p-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isNew ? 'Create New Course' : 'Edit Course Information'}
        subtitle="Manage Moodle link, level, description, and featured status."
        maxWidth="lg"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Course'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Course Title <span className="text-[#007360]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="e.g. Life Cycle Assessment (LCA) for Bio-based Ventures"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Category / Thematic Pillar <span className="text-[#007360]">*</span>
              </label>
              <select
                required
                value={formData.category_id}
                onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              >
                {courseCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Difficulty Level <span className="text-[#007360]">*</span>
              </label>
              <select
                value={formData.level}
                onChange={e =>
                  setFormData({
                    ...formData,
                    level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels',
                  })
                }
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#333333] mb-1">
                Moodle Course Identifier <span className="text-[#007360]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.moodle_course_id}
                onChange={e => setFormData({ ...formData, moodle_course_id: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
                placeholder="e.g. BB-BIO-01"
              />
            </div>

            <div>
              <label className="block font-bold text-[#333333] mb-1">
                External Enrollment URL <span className="text-[#007360]">*</span>
              </label>
              <input
                type="url"
                required
                value={formData.enrollment_url}
                onChange={e => setFormData({ ...formData, enrollment_url: e.target.value })}
                className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
                placeholder="https://moodle.biobusinesscatalyst.eu/course/view.php?id=..."
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#333333] mb-1">
              Course Description <span className="text-[#007360]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#007360]/20 rounded-lg text-sm text-[#333333] focus:outline-hidden focus:ring-2 focus:ring-[#007360]/30"
              placeholder="Outline the learning objectives, practical deliverables, and topics covered..."
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-4 h-4 text-[#007360] rounded border-[#007360]/30 focus:ring-[#007360]"
            />
            <label htmlFor="is_featured" className="text-xs font-bold text-[#333333] cursor-pointer">
              Feature this course prominently on the Home Page
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};
