import React from 'react';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { Clock, Star, Users, CheckCircle2 } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  const { user, progress, formatPrice } = useAuth();

  const key = `${user.id}:${course.id}`;
  const userProg = progress[key];
  const isEnrolled = user.enrolledCourses.includes(course.id);

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = userProg ? userProg.completedLessonIds.length : 0;
  const percentComplete = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div
      onClick={() => onSelect(course)}
      className="group flex flex-col bg-white dark:bg-[#14213D] rounded-2xl border border-[#E5E8F0] dark:border-slate-800 overflow-hidden hover:border-[#7057D9]/50 hover:shadow-lg hover:shadow-[#7057D9]/5 transition-all cursor-pointer"
    >
      {/* Course Thumbnail with fallback */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Elegant fallback gradient
            (e.target as HTMLImageElement).src = '/src/assets/images/category_web_dev_1793158878094.jpg';
          }}
        />

        {/* Enrollment Status Indicator */}
        {isEnrolled && (
          <div className="absolute top-3 left-3 bg-[#14213D]/90 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#35B8A0]" />
            <span>Enrolled · {percentComplete}%</span>
          </div>
        )}

        {/* Price tag in corner */}
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-[#14213D]/95 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-[#14213D] dark:text-white shadow-sm">
          {formatPrice(course.priceNGN, course.priceUSD)}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata: Category · Level · Duration */}
          <div className="flex items-center gap-2 text-xs text-[#737B90] dark:text-slate-400 mb-2">
            <span className="font-semibold text-[#7057D9] dark:text-[#a89af0]">{course.categoryName.split('&')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{course.level}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.durationHours}h
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-[#20263A] dark:text-white group-hover:text-[#7057D9] dark:group-hover:text-[#a89af0] transition-colors line-clamp-2 leading-snug mb-2">
            {course.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#737B90] dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {course.description}
          </p>
        </div>

        <div>
          {/* Progress bar if enrolled */}
          {isEnrolled && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] text-[#737B90] dark:text-slate-400 mb-1">
                <span>{completedCount} of {totalLessons} lessons</span>
                <span className="font-semibold text-[#35B8A0]">{percentComplete}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E8F0] dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#35B8A0] rounded-full transition-all duration-300"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>
          )}

          {/* Instructor & Rating strip */}
          <div className="pt-3 border-t border-[#E5E8F0] dark:border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-[#20263A] dark:text-slate-300 font-medium truncate max-w-[120px]">
                {course.instructor.name}
              </span>
            </div>

            <div className="flex items-center gap-2.5 text-[#737B90] dark:text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                {course.rating.toFixed(1)}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {course.studentsCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
