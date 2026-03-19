import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, CourseDetailType } from '../../../core/services/data.service';
import 'iconify-icon';

type CategoryType = 'webdevelopment' | 'mobiledevelopment' | 'datascience' | 'cloudcomputing' | 'all';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section id="courses-section" class="py-14">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-5 mb-4">
          <h2 class="font-bold tracking-tight text-4xl sm:text-5xl">Popular Courses</h2>
          <div>
            <button class="bg-transparent cursor-pointer hover:bg-primary text-primary font-medium hover:text-white py-3 px-4 border border-primary hover:border-transparent rounded-sm duration-300 transition-colors">
              Explore Classes
            </button>
          </div>
        </div>

        <div class="flex flex-nowrap space-x-5 rounded-xl bg-white p-1 overflow-x-auto mb-4 hide-scrollbar">
          <!-- Desktop Tabs -->
          <button
            (click)="setCategory('webdevelopment')"
            [ngClass]="selectedCategory === 'webdevelopment' ? 'text-black border-b-2 border-yellow-200' : 'text-black/40'"
            class="bg-white pb-2 text-lg hidden sm:block hover:cursor-pointer transition-colors"
          >
            Web Development
          </button>
          <button
            (click)="setCategory('mobiledevelopment')"
            [ngClass]="selectedCategory === 'mobiledevelopment' ? 'text-black border-b-2 border-yellow-200' : 'text-black/40'"
            class="bg-white pb-2 text-lg hidden sm:block hover:cursor-pointer transition-colors"
          >
            Mobile Development
          </button>
          <button
            (click)="setCategory('datascience')"
            [ngClass]="selectedCategory === 'datascience' ? 'text-black border-b-2 border-yellow-200' : 'text-black/40'"
            class="bg-white pb-2 text-lg hidden sm:block hover:cursor-pointer transition-colors"
          >
            Data Science
          </button>
          <button
            (click)="setCategory('cloudcomputing')"
            [ngClass]="selectedCategory === 'cloudcomputing' ? 'text-black border-b-2 border-yellow-200' : 'text-black/40'"
            class="bg-white pb-2 text-lg hidden sm:block hover:cursor-pointer transition-colors"
          >
            Cloud Computing
          </button>

          <!-- Mobile Tabs via Icons -->
          <iconify-icon
            icon="solar:global-line-duotone"
            (click)="setCategory('webdevelopment')"
            [ngClass]="selectedCategory === 'webdevelopment' ? 'border-b-2 border-yellow-200 text-black' : 'text-gray-400'"
            class="text-5xl sm:hidden block cursor-pointer transition-colors"
          ></iconify-icon>
          <iconify-icon
            icon="solar:smartphone-line-duotone"
            (click)="setCategory('mobiledevelopment')"
            [ngClass]="selectedCategory === 'mobiledevelopment' ? 'border-b-2 border-yellow-200 text-black' : 'text-gray-400'"
            class="text-5xl sm:hidden block cursor-pointer transition-colors"
          ></iconify-icon>
          <iconify-icon
            icon="solar:database-line-duotone"
            (click)="setCategory('datascience')"
            [ngClass]="selectedCategory === 'datascience' ? 'border-b-2 border-yellow-200 text-black' : 'text-gray-400'"
            class="text-5xl sm:hidden block cursor-pointer transition-colors"
          ></iconify-icon>
          <iconify-icon
            icon="solar:cloud-line-duotone"
            (click)="setCategory('cloudcomputing')"
            [ngClass]="selectedCategory === 'cloudcomputing' ? 'border-b-2 border-yellow-200 text-black' : 'text-gray-400'"
            class="text-5xl sm:hidden block cursor-pointer transition-colors"
          ></iconify-icon>
        </div>

        <div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ng-container *ngIf="!loading; else skeleton">
              <ng-container *ngIf="filteredCourses.length > 0; else noData">
                @for (course of filteredCourses; track course.course) {
                  <div class="shadow-lg rounded-xl group flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <div class="overflow-hidden rounded-t-lg bg-gray-100 flex-none h-[220px]">
                      <img
                        [src]="course.imageSrc"
                        [alt]="course.course"
                        class="h-full w-full object-cover object-center group-hover:scale-110 transition duration-500 ease-in-out"
                      />
                    </div>
                    <div class="p-4 flex flex-col justify-between gap-5 flex-1 bg-white rounded-b-lg">
                      <div class="flex flex-col gap-5">
                        <div class="flex items-center justify-between">
                          <p class="block font-normal text-gray-900">{{ course.course }}</p>
                          <div class="block text-lg font-semibold text-success border-solid border border-success rounded-md px-2 py-0.5">
                            <p>\${{ course.price }}</p>
                          </div>
                        </div>
                        <a href="javascript:void(0)">
                          <p aria-hidden="true" class="text-xl font-semibold group-hover:text-primary group-hover:cursor-pointer transition-colors">
                            {{ course.profession }}
                          </p>
                        </a>
                      </div>
                      <div class="flex justify-between items-center border border-gray-200 rounded-md p-3">
                        <p class="text-sm text-gray-600 font-medium">12 Classes</p>
                        <div class="flex flex-row space-x-3">
                          <div class="flex items-center">
                            <img src="/images/courses/account.svg" width="16" height="16" alt="circle" />
                            <p class="text-gray-500 ml-1 text-sm">120</p>
                          </div>
                          <div class="flex items-center">
                            <img src="/images/courses/Star.svg" width="16" height="16" alt="star" />
                            <p class="ml-1 text-sm font-medium">4.5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </ng-container>
            </ng-container>

            <ng-template #skeleton>
              @for (i of [1,2,3,4]; track i) {
                <div class="shadow-lg rounded-xl flex flex-col space-y-4 animate-pulse p-4 border border-gray-100 h-[400px]">
                  <div class="bg-gray-200 h-48 rounded-lg w-full"></div>
                  <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              }
            </ng-template>

            <ng-template #noData>
              <p class="col-span-4 text-center text-gray-500 text-lg py-12">No data to show</p>
            </ng-template>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class CoursesComponent implements OnInit {
  courseDetail: CourseDetailType[] = [];
  loading = true;
  selectedCategory: CategoryType = 'webdevelopment';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCourseDetailData().subscribe({
      next: (data) => {
        this.courseDetail = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredCourses(): CourseDetailType[] {
    if (this.selectedCategory === 'all') return this.courseDetail;
    return this.courseDetail.filter(c => c.category === this.selectedCategory);
  }

  setCategory(category: CategoryType) {
    this.selectedCategory = category;
  }
}
