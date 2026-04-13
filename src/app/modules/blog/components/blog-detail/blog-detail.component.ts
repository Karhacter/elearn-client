import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog.model';
import { BlogSidebarComponent } from '../blog-sidebar/blog-sidebar.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, BlogSidebarComponent],
  templateUrl: './blog-detail.component.html',
})
export class BlogDetailComponent {
  readonly post = input<BlogPost | null>(null);
  readonly posts = input.required<BlogPost[]>();
  readonly categoryOptions = input.required<{ slug: string; label: string }[]>();
  readonly tagOptions = input.required<{ slug: string; label: string }[]>();
  readonly recentPosts = input.required<BlogPost[]>();

  readonly contentParagraphs = computed(() => {
    const p = this.post();
    if (!p?.content) return [];
    return p.content
      .split(/\n\n/)
      .map((x) => x.trim())
      .filter(Boolean);
  });

  readonly sidebarActiveCategory = computed(() => this.post()?.category ?? null);
  readonly sidebarActiveTag = computed(() => null as string | null);

  categoryLabel(slug: string): string {
    return this.categoryOptions().find((x) => x.slug === slug)?.label ?? slug;
  }

  tagLabel(slug: string): string {
    return this.tagOptions().find((x) => x.slug === slug)?.label ?? slug;
  }
}
