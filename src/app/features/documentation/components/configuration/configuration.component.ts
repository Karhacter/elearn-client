import { Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
  standalone: true,
  template: `
    <div class="pb-10 md:scroll-m-[180px] scroll-m-28" id="configuration">
      <h3 class="text-2xl font-semibold mt-4 text-black">Project Configuration</h3>
      
      <!-- Color Configuration -->
      <h3 class="text-xl font-semibold mt-8 text-black">Colors</h3>
      <div class="p-6 rounded-md border mt-4 border-dark_border border-opacity-60">
        <p class="text-base font-medium text-muted text-opacity-60">
          <span class="font-semibold text-lg text-black">
            1. Override Colors
          </span> <br />
          For any change in colors : tailwind.config.ts / src/styles.scss
        </p>
        <div class="py-4 px-5 rounded-md bg-black mt-8">
          <p class="text-sm text-white/60 flex flex-col gap-2">
            <span>--color-primary: #611f69;</span>
            <span>--color-cream: #fcf5ef;</span>
            <span>--color-success: #6b9f36;</span>
            <span>--color-orange: #f9cd92;</span>
          </p>
        </div>
      </div>

      <!-- Typography Configuration -->
      <h3 class="text-xl font-semibold mt-8 text-black">Typography</h3>
      <div class="p-6 rounded-md border mt-4 border-dark_border border-opacity-60">
        <p class="text-base font-medium text-muted text-opacity-60">
          1. Change Font family over here : 
          <span class="font-semibold text-base overflow-x-auto">src/index.html & tailwind.config.ts</span> 
        </p>
        <div class="py-4 px-3 rounded-md bg-black mt-8">
          <p class="text-sm text-white/60 flex flex-col gap-2 mb-3">
            &lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"&gt;
          </p>
        </div>
      </div>

      <!-- Logo Configuration -->
      <h3 class="text-xl font-semibold mt-8 text-black">Logo</h3>
      <div class="p-6 rounded-md border mt-4 border-dark_border border-opacity-60">
        <p class="text-base font-medium text-muted text-opacity-60 flex lg:flex-row flex-col">
          1. Change Logo over here : 
          <span class="font-semibold text-base overflow-x-auto ms-1">
            src/app/shared/components/header/logo/logo.component.ts
          </span> 
        </p>
        <div class="py-4 px-3 rounded-md bg-black mt-8 overflow-x-auto">
          <div class="text-sm text-white/60">
            <p>&lt;a routerLink="/"&gt;</p>
            <p>&lt;img</p>
            <p class="pl-4">src="/images/logo/logo.svg"</p>
            <p class="pl-4">alt="logo"</p>
            <p class="pl-4">class="w-auto h-auto"</p>
            <p>/&gt;</p>
            <p>&lt;/a&gt;</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfigurationComponent {}
