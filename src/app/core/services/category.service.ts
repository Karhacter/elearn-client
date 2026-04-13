import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryItem } from '../../modules/home/models/home-ui.model';

export interface ServiceResult<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface CategoryApiResponse {
  id: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5263/api/Category';

  /** Fetch all categories and map to UI model. */
  getCategories(): Observable<CategoryItem[]> {
    return this.http.get<ServiceResult<CategoryApiResponse[]>>(this.apiUrl).pipe(
      map((response) => {
        if (response.success && response.data) {
          return response.data.map((cat) => this.mapToCategoryItem(cat));
        }
        return [];
      }),
    );
  }

  private mapToCategoryItem(api: CategoryApiResponse): CategoryItem {
    return {
      id: api.id.toString(),
      label: api.name || 'Unknown',
      description: api.description || '',
      icon: this.getIconForCategory(api.name),
    };
  }

  /**
   * Temporary icon mapping since backend doesn't provide icons yet.
   * Matches the visual style of the mocks.
   */
  private getIconForCategory(name: string = ''): string {
    const n = name.toLowerCase();
    if (n.includes('science') || n.includes('data')) return '🧬';
    if (n.includes('dev') || n.includes('coding') || n.includes('software')) return '⚡';
    if (n.includes('ux') || n.includes('ui') || n.includes('design')) return '✦';
    if (n.includes('biz') || n.includes('business') || n.includes('marketing')) return '📈';
    if (n.includes('art') || n.includes('graphic')) return '🎨';
    if (n.includes('ml') || n.includes('ai') || n.includes('machine')) return '🤖';
    return '📚';
  }
}
