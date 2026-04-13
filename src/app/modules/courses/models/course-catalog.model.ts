import { CourseSummary } from '../../home/models/home-ui.model';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

/** Catalog row: everything on `CourseSummary` plus list/detail fields. */
export interface CourseCatalogItem extends CourseSummary {
  description: string;
  level: CourseLevel;
  categoryId: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  durationMin: number;
}

export interface CourseReview {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  rating: number;
  body: string;
  dateLabel: string;
}

export interface CourseDetail extends CourseCatalogItem {
  instructorBio: string;
  lessons: CourseLesson[];
  reviews: CourseReview[];
}

export type CourseListLayout = 'grid' | 'list' | 'sidebar';
export type SidebarPaneLayout = 'grid' | 'list';
