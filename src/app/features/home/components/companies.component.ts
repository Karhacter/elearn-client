import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../core/services/data.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section>
      <div class="container mx-auto max-w-7xl px-4 overflow-hidden">
        <h2 class="text-lg mb-10 text-black/40 text-center font-medium">
          Trusted by companies of all sizes
        </h2>
        <div>
          <swiper-container
            slides-per-view="1"
            speed="2000"
            autoplay-delay="2000"
            autoplay-disable-on-interaction="false"
            loop="true"
            breakpoints='{"500": {"slidesPerView": 2}, "700": {"slidesPerView": 3}, "1024": {"slidesPerView": 4}}'
          >
            @for (item of companies; track item.imgSrc) {
              <swiper-slide>
                <div class="flex justify-center items-center h-24">
                  <img
                    [src]="item.imgSrc"
                    [alt]="item.imgSrc"
                    class="w-auto max-h-16 opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </swiper-slide>
            }
          </swiper-container>
        </div>
      </div>
    </section>
  `
})
export class CompaniesComponent implements OnInit {
  companies: { imgSrc: string }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCompaniesData().subscribe(data => {
      this.companies = data;
    });
  }
}
