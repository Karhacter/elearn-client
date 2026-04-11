import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterLinkGroup, SocialLinkItem } from '../../models/home-ui.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  @Input() brandLabel = 'NeoLearn';
  @Input() brandBlurb =
    'When the world is constantly changing, we help you win with skills that glow on your résumé and in production.';
  @Input() columns: FooterLinkGroup[] = [
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Courses', href: '#' },
        { label: 'Events', href: '#' },
        { label: 'Instructor', href: '#' },
        { label: 'Career', href: '#' },
        { label: 'Become a Teacher', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { label: 'Browse Library', href: '#' },
        { label: 'Library', href: '#' },
        { label: 'Partners', href: '#' },
        { label: 'News & Blogs', href: '#' },
        { label: 'FAQs', href: '#' },
        { label: 'Tutorials', href: '#' },
      ],
    },
  ];
  @Input() copyright = '© 2026 NeoLearn, All Rights Reserved.';
  @Input() designCredit = 'UI crafted for NeoLearn.';
  @Input() newsletterTitle = 'Subscribe';
  @Input() newsletterPlaceholder = 'Your email address';
  @Input() newsletterSubtext =
    'Get the latest news and updates right in your inbox.';
  @Input() socialLinks: SocialLinkItem[] = [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Twitter', href: '#', icon: 'twitter' },
    { label: 'Pinterest', href: '#', icon: 'pinterest' },
  ];

  @Output() readonly newsletterSubmit = new EventEmitter<string>();

  email = '';

  onNewsletterSubmit(): void {
    const v = this.email.trim();
    if (v) {
      this.newsletterSubmit.emit(v);
    }
  }

  socialClass(icon: SocialLinkItem['icon']): string {
    const base =
      'flex h-10 w-10 items-center justify-center rounded-lg border text-white transition hover:-translate-y-0.5 hover:shadow-lg';
    switch (icon) {
      case 'facebook':
        return `${base} border-blue-600/50 bg-[#1877f2]/90 hover:shadow-blue-500/40`;
      case 'twitter':
        return `${base} border-sky-500/50 bg-sky-500/90 hover:shadow-sky-400/40`;
      case 'pinterest':
        return `${base} border-red-500/50 bg-[#e60023]/90 hover:shadow-red-500/40`;
      case 'youtube':
        return `${base} border-red-600/50 bg-red-600/90 hover:shadow-red-500/40`;
      case 'discord':
        return `${base} border-indigo-500/50 bg-indigo-600/90 hover:shadow-indigo-500/40`;
      default:
        return `${base} border-white/20 bg-white/10`;
    }
  }
}
