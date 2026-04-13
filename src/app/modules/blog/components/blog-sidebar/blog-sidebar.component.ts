import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog.model';

@Component({
  selector: 'app-blog-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-sidebar.component.html',
})
export class BlogSidebarComponent {
  @Input({ required: true }) recentPosts: BlogPost[] = [];
  @Input({ required: true }) categories: { slug: string; label: string }[] = [];
  @Input({ required: true }) tags: { slug: string; label: string }[] = [];

  @Input() activeCategory: string | null = null;
  @Input() activeTag: string | null = null;

  chipActive(slug: string | null, kind: 'category' | 'tag'): boolean {
    if (kind === 'category') return this.activeCategory === slug;
    return this.activeTag === slug;
  }

  filterChipClass(active: boolean): string {
    return active
      ? 'border-blue-500 bg-blue-50 text-blue-800 dark:border-cyan-400/60 dark:bg-cyan-500/15 dark:text-cyan-200 dark:shadow-[0_0_16px_rgba(34,211,238,0.2)]'
      : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50/50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400/30 dark:hover:bg-white/10';
  }
}
