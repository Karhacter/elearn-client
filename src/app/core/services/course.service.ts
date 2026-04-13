import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseCatalogItem, CourseDetail } from '../../modules/courses/models/course-catalog.model';

// --- API Response Interfaces ---

export interface ServiceResult<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/** Specific structure for the component to consume. */
export interface PaginatedCourses {
  courses: CourseCatalogItem[];
  totalPages: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface CourseApiResponse {
  courseId: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  thumbnail: string;
  instructorName: string;
  genreName?: string;
  // Add other fields as needed from CourseResponse.cs
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5263/api/Course';

  /**
   * Fetch courses with pagination.
   * @param page 1-indexed page number
   * @param pageSize number of items per page
   */
  getCourses(page: number = 1, pageSize: number = 10): Observable<PaginatedCourses> {
    const params = new HttpParams()
      .set('pageNumber', page.toString()) // Backend uses pageNumber for client endpoint
      .set('pageSize', pageSize.toString());

    // Using /api/Course/client for better mapped data for homepage
    return this.http
      .get<ServiceResult<PagedResult<CourseApiResponse>>>(`http://localhost:5263/api/Course/client`, { params })
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            return {
              courses: response.data.items.map((item) => this.mapToCatalogItem(item)),
              totalPages: response.data.totalPages,
              totalCount: response.data.totalCount,
              pageNumber: response.data.pageNumber,
              pageSize: response.data.pageSize,
            };
          }
          return {
            courses: [],
            totalPages: 0,
            totalCount: 0,
            pageNumber: page,
            pageSize: pageSize,
          };
        }),
      );
  }

  /** Fetch courses by Category ID. */
  getCoursesByCategory(categoryId: number): Observable<CourseCatalogItem[]> {
    return this.http.get<ServiceResult<CourseApiResponse[]>>(`${this.apiUrl}/category/${categoryId}`).pipe(
      map((response) => {
        if (response.success && response.data) {
          return response.data.map((item) => this.mapToCatalogItem(item));
        }
        return [];
      }),
    );
  }

  /** Fetch course by ID with mapping to UI model. */
  getCourseById(id: string | number): Observable<CourseDetail | null> {
    return this.http.get<ServiceResult<CourseApiResponse>>(`${this.apiUrl}/detail/${id}`).pipe(
      map((response) => {
        if (response.success && response.data) {
          return this.mapToCourseDetail(response.data);
        }
        return null;
      }),
    );
  }

  /** Map API item to CourseCatalogItem (for grid/list views). */
  private mapToCatalogItem(api: CourseApiResponse): CourseCatalogItem {
    return {
      id: api.courseId.toString(),
      title: api.title || 'Untitled Course',
      thumbnailUrl: api.thumbnail || '/assets/images/placeholder.jpg',
      price: api.price || 0,
      instructorName: api.instructorName || 'Unknown Instructor',
      description: api.description || '',
      categoryId: 'all',
      level: 'beginner',
      categoryLabel: 'General',
      categoryTone: 'cyan',
      lessonCount: 0,
      rating: 4.5, // Mock default
      reviewCount: 0,
      instructorAvatarUrl: '/assets/images/default-avatar.jpg',
    };
  }

  /** Map API item to CourseDetail (for detail page). */
  private mapToCourseDetail(api: CourseApiResponse): CourseDetail {
    const catalogItem = this.mapToCatalogItem(api);
    return {
      ...catalogItem,
      instructorBio: 'Expert instructor in this field.',
      lessons: [], // Could be fetched from /api/Course/{id}/sections if needed
      reviews: [],
    };
  }
}
