import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-about-stat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="rounded-2xl border border-slate-200/80 bg-white/80 p-6 text-center shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-blue-200 hover:shadow-lg dark:border-white/10 dark:bg-[#070714]/80 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_0_32px_rgba(34,211,238,0.18)] md:p-8"
    >
      <p
        class="text-3xl font-black tabular-nums text-blue-700 md:text-4xl dark:bg-gradient-to-r dark:from-cyan-300 dark:to-fuchsia-400 dark:bg-clip-text dark:text-transparent dark:drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]"
      >
        {{ display() | number : '1.0-0' }}<span class="text-xl font-bold md:text-2xl">{{ suffix() }}</span>
      </p>
      <p class="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-400">{{ label() }}</p>
    </div>
  `,
})
export class AboutStatComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly target = input.required<number>();
  readonly label = input.required<string>();
  readonly suffix = input<string>('');

  readonly display = signal(0);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.display.set(this.target());
    }
  }

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      const el = this.host.nativeElement;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            obs.disconnect();
            this.animate();
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
    });
  }

  private animate(): void {
    const to = this.target();
    const start = performance.now();
    const dur = 1700;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) * (1 - t);
      this.display.set(Math.round(to * eased));
      if (t < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }
}
