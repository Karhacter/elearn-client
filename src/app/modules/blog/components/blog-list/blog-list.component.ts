import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog.model';
import { BlogSidebarComponent } from '../blog-sidebar/blog-sidebar.component';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, BlogSidebarComponent],
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent {
  private readonly route = inject(ActivatedRoute);

  readonly posts = input.required<BlogPost[]>();
  readonly categoryOptions = input.required<{ slug: string; label: string }[]>();
  readonly tagOptions = input.required<{ slug: string; label: string }[]>();
  readonly recentPosts = input.required<BlogPost[]>();

  private readonly categoryFilter = signal<string | null>(null);
  private readonly tagFilter = signal<string | null>(null);

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((qp) => {
      this.categoryFilter.set(qp.get('category') || null);
      this.tagFilter.set(qp.get('tag') || null);
    });
  }

  readonly filteredPosts = computed(() => {
    let list = this.posts();
    const c = this.categoryFilter();
    const t = this.tagFilter();
    if (c) {
      list = list.filter((p) => p.category === c);
    }
    if (t) {
      list = list.filter((p) => p.tags.includes(t));
    }
    return list;
  });

  readonly activeCategory = computed(() => this.categoryFilter());
  readonly activeTag = computed(() => this.tagFilter());

  categoryLabel(slug: string): string {
    return this.categoryOptions().find((x) => x.slug === slug)?.label ?? slug;
  }

  tagLabel(slug: string): string {
    return this.tagOptions().find((x) => x.slug === slug)?.label ?? slug;
  }
}
