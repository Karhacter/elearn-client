import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home/home-page.component';
import { CourseDetailPageComponent } from './modules/courses/pages/course-detail-page/course-detail-page.component';
import { CourseListPageComponent } from './modules/courses/pages/course-list-page/course-list-page.component';
import { BlogDetailPageComponent } from './modules/blog/pages/blog-detail-page/blog-detail-page.component';
import { BlogListPageComponent } from './modules/blog/pages/blog-list-page/blog-list-page.component';
import { AboutComponent } from './modules/pages/about/about.component';
import { ContactComponent } from './modules/pages/contact/contact.component';
import { SigninComponent } from './modules/pages/signin/signin.component';
import { SignupComponent } from './modules/pages/signup/signup.component';
import { CartPageComponent } from './modules/cart/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './modules/checkout/pages/checkout-page/checkout-page.component';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [
      () => {
        const platformId = inject(PLATFORM_ID);
        if (isPlatformBrowser(platformId)) {
          // Replace with the specific URL you want to redirect to
          window.location.href = 'http://localhost:64934'; // Placeholder
        }
        return false;
      },
    ],
    component: HomePageComponent,
  },
  { path: '', component: HomePageComponent },
  {
    path: 'courses/grid',
    component: CourseListPageComponent,
    data: { courseListView: 'grid' as const },
  },
  {
    path: 'courses/list',
    component: CourseListPageComponent,
    data: { courseListView: 'list' as const },
  },
  {
    path: 'courses/browse',
    component: CourseListPageComponent,
    data: { courseListView: 'sidebar' as const },
  },
  { path: 'courses/:id', component: CourseDetailPageComponent },
  { path: 'course/:id', component: CourseDetailPageComponent },
  { path: 'courses', redirectTo: 'courses/grid', pathMatch: 'full' },
  { path: 'blog', component: BlogListPageComponent },
  { path: 'blog/:id', component: BlogDetailPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
];
