import { Component } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  template: `
    <section id="join-section" class="-mb-64">
      <div class="relative z-10">
        <div class="mx-auto max-w-2xl py-16 md:py-24 px-4 sm:px-6 md:max-w-7xl lg:px-24 bg-orange rounded-lg bg-newsletter bg-contain bg-no-repeat bg-right-bottom">
          <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8">
            <div>
              <h3 class="text-5xl font-bold mb-3 text-black"> Join Our Newsletter </h3>
              <h4 class="text-lg font-medium mb-7 text-black">
                Subscribe our newsletter for discounts, promo and many more.
              </h4>
              <div class="flex gap-2">
                <input
                  type="email"
                  class="py-4 w-full text-base px-4 bg-white transition-all duration-500 focus:border-primary focus:outline-1 rounded-lg pl-4 text-black"
                  placeholder="Enter your email"
                  autocomplete="off"
                />
                <button class="bg-primary cursor-pointer hover:bg-transparent border border-primary hover:text-primary text-white font-medium py-2 px-4 rounded-sm transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
            <div class="hidden sm:block">
              <div class="float-right -mt-32">
                <img
                  src="/images/newsletter/Free.svg"
                  alt="bgimg"
                  width="64"
                  height="64"
                  class="w-auto h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class NewsletterComponent {}
