import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-0.5 mt-4 items-start fixed pe-4">
      <a *ngFor="let item of docsNav"
         (click)="getNavItem(item.hash, $event)"
         class="cursor-pointer py-2.5 hover:bg-primary/20 hover:text-primary dark:hover:text-primary xl:min-w-60 lg:min-w-52 min-w-full px-4 rounded-md text-base font-medium transition-colors"
         [ngClass]="{
           'bg-primary text-white hover:text-white dark:hover:text-white': item.hash === navItem,
           'text-black/60': item.hash !== navItem
         }">
        {{ item.navItem }}
      </a>
    </div>
  `
})
export class DocNavigationComponent {
  navItem = 'version';

  docsNav = [
    { id: 1, navItem: "Package Versions", hash: "version" },
    { id: 2, navItem: "Package Structure", hash: "structure" },
    { id: 3, navItem: "Quick Start", hash: "start" },
    { id: 4, navItem: "Project Configuration", hash: "configuration" },
  ];

  getNavItem(hash: string, event: Event) {
    event.preventDefault();
    this.navItem = hash;
    const element = document.getElementById(hash);
    if (element) {
      // Adding a small offset using scrollIntoView might not be perfect due to fixed header.
      // But standard scrollIntoView works identically to Next.js #hash navigation
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
