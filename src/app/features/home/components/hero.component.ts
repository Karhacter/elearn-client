import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section id="Home" class="bg-banner-image pt-28 pb-20 bg-cover bg-center">
      <div class="relative px-6 lg:px-8">
        <div class="container mx-auto">
          <div class="flex flex-col gap-4 text-center">
            <h1 class="leading-tight font-bold tracking-tight max-w-4xl mx-auto text-black md:text-7xl sm:text-6xl text-5xl">
              Advance your engineering skills with our courses
            </h1>
            <p class="text-lg leading-8 text-black">
              Build skills with our courses and mentor from world-class companies.
            </p>
            <div class="backdrop-blur-md bg-white/30 border border-white/30 rounded-lg shadow-lg p-6 w-fit mx-auto">
              <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <!-- Avatars -->
                <div class="hidden sm:block -space-x-2 overflow-hidden flex-row">
                  <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="img1" />
                  <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="img2" />
                  <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="img3" />
                  <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="img4" />
                </div>
                <!-- Stars -->
                <div class="flex flex-col">
                  <div class="flex justify-center sm:justify-start items-center">
                    <h3 class="text-2xl font-semibold mr-2">4.6</h3>
                    <img src="/images/banner/Stars.svg" alt="stars-icon" width="80" height="24" class="w-[60%]" />
                  </div>
                  <div>
                    <h3 class="text-sm">Rated by 25k on google.</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- DROPDOWN BUTTONS -->
          <div class="mx-auto max-w-4xl mt-12 p-6 bg-white rounded-lg shadow-xl shadow-mentorShadow ring-1 ring-gray-200">
            <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
              
              <div class="col-span-3">
                <!-- Dropdown 1 translation to standard select -->
                <div class="flex items-center w-full relative h-[60px] cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-hidden focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <iconify-icon icon="heroicons:book-open" class="mr-3 text-xl text-gray-500"></iconify-icon>
                  <select class="w-full bg-transparent outline-none appearance-none cursor-pointer">
                    <option value="Front End">Front End Courses</option>
                    <option value="Back End">Back End</option>
                    <option value="Full Stack">Full Stack</option>
                  </select>
                </div>
              </div>
              
              <div class="col-span-3">
                <!-- Dropdown 2 translation -->
                <div class="flex items-center w-full relative h-[60px] cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-hidden focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <iconify-icon icon="heroicons:clock" class="mr-3 text-xl text-gray-500"></iconify-icon>
                  <select class="w-full bg-transparent outline-hidden appearance-none cursor-pointer">
                    <option value="20hrs">20hrs in a Month</option>
                    <option value="30hrs">30hrs in a Month</option>
                    <option value="40hrs">40hrs in a Month</option>
                  </select>
                </div>
              </div>

              <div class="col-span-3 sm:col-span-2 mt-2">
                <a routerLink="/#courses-section">
                  <button class="bg-primary flex items-center justify-center w-full hover:bg-transparent hover:text-primary duration-300 border border-primary text-white font-bold py-4 px-3 rounded-sm hover:cursor-pointer transition-colors">
                    Start
                  </button>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent { }
