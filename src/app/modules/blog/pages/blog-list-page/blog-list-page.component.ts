import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../../../home/components/footer/footer.component';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { MOCK_CATEGORIES, MOCK_NAV, MOCK_USER } from '../../../home/data/home-mock.data';
import {
  blogCategoriesFromPosts,
  blogTagsFromPosts,
  MOCK_BLOG_POSTS,
  recentBlogPosts,
} from '../../data/blog-mock.data';
import { BlogListComponent } from '../../components/blog-list/blog-list.component';

@Component({
  selector: 'app-blog-list-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, BlogListComponent],
  templateUrl: './blog-list-page.component.html',
})
export class BlogListPageComponent {
  private readonly router = inject(Router);

  readonly navItems = MOCK_NAV;
  readonly user = MOCK_USER;
  readonly categories = MOCK_CATEGORIES;
  readonly posts = MOCK_BLOG_POSTS;
  readonly categoryOptions = blogCategoriesFromPosts(MOCK_BLOG_POSTS);
  readonly tagOptions = blogTagsFromPosts(MOCK_BLOG_POSTS);
  readonly recentPosts = recentBlogPosts(MOCK_BLOG_POSTS);

  onSearch(q: string): void {
    console.debug('[blog] search', q);
  }

  onTryFree(): void {
    void this.router.navigate(['/sign-up']);
  }

  onNewsletter(email: string): void {
    console.debug('[blog] newsletter', email);
  }
}
