import { Component, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (isVisible) {
      <div class="fixed bottom-8 right-8 z-50">
        <button
          (click)="scrollToTop()"
          class="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <iconify-icon icon="material-symbols:keyboard-double-arrow-up-rounded" width="24" height="24"></iconify-icon>
        </button>
      </div>
    }
  `
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
