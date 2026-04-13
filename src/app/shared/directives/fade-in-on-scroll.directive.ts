import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';

/** Fades and slides content in when it enters the viewport (browser only; SSR shows final state). */
@Directive({
  selector: '[appFadeIn]',
  standalone: true,
})
export class FadeInOnScrollDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  /** Stagger animations (ms). */
  @Input() fadeInDelay = 0;

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;
    host.classList.add('transition-all', 'duration-700', 'ease-out', 'will-change-[opacity,transform]');
    if (this.fadeInDelay > 0) {
      host.style.transitionDelay = `${this.fadeInDelay}ms`;
    }

    if (!isPlatformBrowser(this.platformId)) {
      host.classList.add('opacity-100', 'translate-y-0');
      return;
    }

    host.classList.add('opacity-0', 'translate-y-8');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            host.classList.remove('opacity-0', 'translate-y-8');
            host.classList.add('opacity-100', 'translate-y-0');
            this.observer?.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
