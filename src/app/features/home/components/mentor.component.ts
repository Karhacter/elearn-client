import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, MentorType } from '../../../core/services/data.service';

@Component({
  selector: 'app-mentor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section id="mentors-section" class="py-14">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="flex flex-col sm:flex-row gap-5 justify-between sm:items-center mb-12">
          <h2 class="font-bold tracking-tight text-4xl sm:text-5xl">Meet with our Mentors</h2>
          <div>
            <button class="bg-transparent cursor-pointer hover:bg-primary text-primary font-medium hover:text-white py-3 px-4 border border-primary hover:border-transparent rounded-sm duration-300">
              Explore 10+ our Mentor
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          <ng-container *ngIf="!loading; else skeleton">
            @for (item of mentor; track item.name) {
              <div class="group relative shadow-lg rounded-lg pb-6">
                <div class="min-h-80 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:h-80">
                  <img
                    [src]="item.imageSrc"
                    [alt]="item.imageAlt"
                    class="h-full w-full object-cover object-center lg:h-full lg:w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div class="my-4 flex justify-center">
                  <div>
                    <div class="border border-white rounded-lg -mt-12 bg-white p-2 shadow-mentorShadow flex items-center justify-center relative z-10 w-fit mx-auto px-4">
                      <a [routerLink]="item.href" class="text-sm text-gray-700 text-center hover:text-primary transition-colors font-medium">
                        {{ item.name }}
                      </a>
                    </div>
                    <p class="mt-3 text-2xl font-semibold text-black/80 text-center">
                      {{ item.color }}
                    </p>
                  </div>
                </div>
              </div>
            }
          </ng-container>

          <ng-template #skeleton>
            @for (i of [1,2,3,4,5,6]; track i) {
              <div class="shadow-lg rounded-xl flex flex-col animate-pulse border border-gray-100 pb-6">
                <div class="bg-gray-200 h-80 rounded-t-lg w-full"></div>
                <div class="-mt-8 bg-white h-10 w-3/4 mx-auto rounded-lg"></div>
                <div class="mt-4 h-6 w-1/2 mx-auto bg-gray-200 rounded"></div>
              </div>
            }
          </ng-template>
        </div>
      </div>
    </section>
  `
})
export class MentorComponent implements OnInit {
  mentor: MentorType[] = [];
  loading = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMentorData().subscribe({
      next: (data) => {
        this.mentor = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
