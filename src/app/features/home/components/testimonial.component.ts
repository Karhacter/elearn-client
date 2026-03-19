import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, TestimonialType } from '../../../core/services/data.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section id="testimonial-section" class="bg-cream py-14">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="flex flex-col sm:flex-row gap-5 justify-between sm:items-center mb-6">
          <h2 class="font-bold tracking-tight text-4xl sm:text-5xl">
            What Our Happy <br /> Students Says
          </h2>
          <div>
            <button class="bg-transparent cursor-pointer hover:bg-primary text-primary font-semibold hover:text-white py-3 px-4 border border-primary hover:border-transparent rounded-sm duration-300 transition-colors">
              Give Your Review
            </button>
          </div>
        </div>
        <p class="text-lg font-medium mb-10 text-black/70">
          Build skills with our courses and mentor <br /> from world-class companies.
        </p>

        <div class="overflow-hidden pb-12">
          <swiper-container
            slides-per-view="1"
            navigation="false"
            pagination="true"
            pagination-clickable="true"
            speed="500"
            loop="true"
            breakpoints='{"800": {"slidesPerView": 2}, "1200": {"slidesPerView": 3}}'
            space-between="30"
          >
            @for (item of testimonial; track item.name) {
              <swiper-slide class="h-auto">
                <div class="bg-white m-4 pt-8 px-6 sm:px-12 pb-10 text-center rounded-lg shadow-lg h-full flex flex-col justify-start">
                  
                  <div class="relative z-0 flex justify-center items-center mx-auto w-fit before:absolute before:bg-[url('/images/testimonial/greenpic.svg')] before:bg-cover before:h-6 before:w-6 before:bottom-0 before:z-10 before:left-[54%]">
                    <img
                      [src]="item.imgSrc"
                      [alt]="item.name"
                      class="inline-block rounded-full ring-2 ring-gray-100 relative w-16 h-16 object-cover"
                    />
                  </div>
                  
                  <div class="mt-2 flex-grow">
                    <p class="text-sm pt-4 pb-2 text-gray-500 uppercase tracking-wide">{{ item.profession }}</p>
                    <p class="text-2xl font-semibold pb-3 text-black">{{ item.name }}</p>
                    <img
                      [src]="item.starimg"
                      alt="stars-img"
                      class="mx-auto pb-6 w-[100px]"
                    />
                    <p class="text-lg font-medium leading-relaxed text-gray-600">
                      {{ item.detail }}
                    </p>
                  </div>
                  
                </div>
              </swiper-slide>
            }
          </swiper-container>
        </div>
      </div>
    </section>
  `,
  styles: [`
    swiper-container::part(pagination) {
      bottom: -10px;
    }
  `]
})
export class TestimonialComponent implements OnInit {
  testimonial: TestimonialType[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getTestimonialData().subscribe(data => {
      this.testimonial = data;
    });
  }
}
