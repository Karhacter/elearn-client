import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

const STORAGE_KEY = 'elearn-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /** `true` when `.dark` is on &lt;html&gt; */
  readonly dark = signal(false);

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    this.apply(stored === 'dark');
  }

  toggle(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.apply(!this.dark());
  }

  private apply(useDark: boolean): void {
    const root = this.doc.documentElement;
    if (useDark) {
      root.classList.add('dark');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
    this.dark.set(useDark);
  }
}
