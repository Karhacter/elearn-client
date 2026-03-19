import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero.component';
import { CompaniesComponent } from './components/companies.component';
import { CoursesComponent } from './components/courses.component';
import { MentorComponent } from './components/mentor.component';
import { TestimonialComponent } from './components/testimonial.component';
import { NewsletterComponent } from './components/newsletter.component';
import { ContactFormComponent } from './components/contact-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    CompaniesComponent,
    CoursesComponent,
    MentorComponent,
    TestimonialComponent,
    NewsletterComponent,
    ContactFormComponent
  ],
  template: `
    <main>
      <app-hero></app-hero>
      <app-companies></app-companies>
      <app-courses></app-courses>
      <app-mentor></app-mentor>
      <app-testimonial></app-testimonial>
      <app-contact-form></app-contact-form>
      <app-newsletter></app-newsletter>
    </main>
  `
})
export class HomeComponent {}
