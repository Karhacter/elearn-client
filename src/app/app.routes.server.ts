import { RenderMode, ServerRoute } from '@angular/ssr';
import { MOCK_BLOG_POSTS } from './modules/blog/data/blog-mock.data';
import { MOCK_COURSE_DETAILS_LIST } from './modules/courses/data/courses-mock.data';

export const serverRoutes: ServerRoute[] = [
  { path: 'admin', renderMode: RenderMode.Server },
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'sign-in', renderMode: RenderMode.Prerender },
  { path: 'sign-up', renderMode: RenderMode.Prerender },
  { path: 'cart', renderMode: RenderMode.Prerender },
  { path: 'checkout', renderMode: RenderMode.Prerender },
  { path: 'courses/grid', renderMode: RenderMode.Prerender },
  { path: 'courses/list', renderMode: RenderMode.Prerender },
  { path: 'courses/browse', renderMode: RenderMode.Prerender },
  {
    path: 'courses/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return MOCK_COURSE_DETAILS_LIST.map((c) => ({ id: c.id }));
    },
  },
  { path: 'blog', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return MOCK_BLOG_POSTS.map((p) => ({ id: p.id }));
    },
  },
  { path: '**', renderMode: RenderMode.Server },
];
