import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/">
      <img
        src="/images/logo/logo.svg"
        alt="logo"
        width="160"
        height="50"
        style="width: auto; height: auto"
      />
    </a>
  `,
})
export class LogoComponent {}
