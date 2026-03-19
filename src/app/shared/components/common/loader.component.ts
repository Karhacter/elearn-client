import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
  `,
  styles: []
})
export class LoaderComponent {}
