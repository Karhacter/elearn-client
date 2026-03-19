import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocNavigationComponent } from '../doc-navigation/doc-navigation.component';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule, DocNavigationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div id="version" class="md:scroll-m-[180px] scroll-m-28">
      <div *ngIf="docNavbarOpen"
           class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
           (click)="docNavbarOpen = false">
      </div>

      <div class="flex items-center justify-between">
        <h3 class="text-2xl mt-4 font-semibold mb-6 text-black">
          Package Versions
        </h3>
        <button (click)="docNavbarOpen = true" class="p-0 border-0 bg-transparent cursor-pointer">
          <iconify-icon icon="gg:menu-right" class="text-3xl lg:hidden block text-black"></iconify-icon>
        </button>
      </div>

      <div class="w-full flex justify-between lg:gap-0 gap-6 lg:flex-nowrap flex-wrap p-6 rounded-md border border-dark_border border-opacity-60">
        <div *ngFor="let item of packageVersions"
             class="lg:w-1/5 md:w-full text-center lg:border-b-0 border-b lg:border-e lg:last:border-e-0 last:border-b-0 border-dark_border border-opacity-60 pb-6 lg:pb-0">
          <img [src]="item.img" alt="npm-package" class="mx-auto w-10 h-10 object-contain" width="64" height="64" />
          <h5 class="text-2xl font-bold mt-3.5 text-black">v{{ item.version }}</h5>
          <p class="text-base font-medium text-muted">
            {{ item.packageName }}
          </p>
        </div>
      </div>

      <div class="mt-5">
        <p class="text-base font-medium text-muted text-opacity-60">
          SiEducational Tailwind NextJs Template is built with Tailwindcss and Angular.
        </p>
        <p class="text-base font-medium text-muted text-opacity-60">
          These theme is ready to use and you can totally customize as per your requirement.
        </p>
        <p class="text-base font-medium text-muted text-opacity-60">
          For Customize, You should have knowledge of Angular, TypeScript, and
          Tailwind css to be able to modify these template.
        </p>
      </div>
    </div>

    <div class="lg:hidden block fixed top-0 right-0 h-full w-full bg-white dark:bg-dark shadow-lg transform transition-transform duration-300 max-w-xs z-50"
         [ngClass]="docNavbarOpen ? 'translate-x-0' : 'translate-x-full'">
      <div class="flex items-center justify-between p-4">
        <h2 class="text-lg font-bold text-midnight_text dark:text-black">
          Docs Menu
        </h2>
        <button (click)="docNavbarOpen = false" aria-label="Close mobile menu" class="border-0 bg-transparent cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="dark:text-black text-black">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav class="px-4">
        <app-doc-navigation></app-doc-navigation>
      </nav>
    </div>
  `
})
export class IntroductionComponent {
  docNavbarOpen = false;

  packageVersions = [
    {
      id: '1',
      packageName: 'Angular',
      img: '/images/documentation/Categories=Nextjs.svg', // Might need an angular icon instead but for now keeping next
      version: '19.0.0', // Updated to realistic angular version
    },
    {
      id: '2',
      packageName: 'Tailwindcss',
      img: '/images/documentation/Categories=Tailwind.svg',
      version: '3.4.1',
    },
    {
      id: '3',
      packageName: 'Typescript',
      img: '/images/documentation/Categories=Typescript.svg',
      version: '5.6.3',
    },
  ];
}
