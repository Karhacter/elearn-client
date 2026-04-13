import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { MOCK_CATEGORIES, MOCK_NAV, MOCK_USER } from '../../../home/data/home-mock.data';
import {
  blogCategoriesFromPosts,
  blogTagsFromPosts,
  getBlogPostById,
  MOCK_BLOG_POSTS,
  recentBlogPosts,
} from '../../data/blog-mock.data';
import { BlogPost } from '../../models/blog.model';
import { BlogDetailComponent } from '../../components/blog-detail/blog-detail.component';

@Component({
  selector: 'app-blog-detail-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, BlogDetailComponent],
  templateUrl: './blog-detail-page.component.html',
})
export class BlogDetailPageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;
  readonly posts = MOCK_BLOG_POSTS;
  readonly categoryOptions = blogCategoriesFromPosts(MOCK_BLOG_POSTS);
  readonly tagOptions = blogTagsFromPosts(MOCK_BLOG_POSTS);
  readonly recentPosts = recentBlogPosts(MOCK_BLOG_POSTS);

  readonly post: BlogPost | null;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.post = getBlogPostById(id) ?? null;
  }

  onSearch(q: string): void {
    console.debug('[blog-detail] search', q);
  }

  onTryFree(): void {
    void this.router.navigate(['/sign-up']);
  }

  onNewsletter(email: string): void {
    console.debug('[blog-detail] newsletter', email);
  }
}
