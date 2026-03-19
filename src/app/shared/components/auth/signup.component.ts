import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../../layouts/header/logo.component';
import { SocialSignInComponent } from './social-signin.component';
import { LoaderComponent } from '../common/loader.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LogoComponent, SocialSignInComponent, LoaderComponent],
  template: `
    <div class="mb-10 text-center mx-auto inline-block max-w-[160px]">
      <app-logo></app-logo>
    </div>

    <app-social-signin></app-social-signin>

    <span class="z-1 relative my-8 block text-center before:content-[''] before:absolute before:h-px before:w-[40%] before:bg-black/20 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-[40%] after:bg-black/20 after:top-3 after:right-0">
      <span class="text-body-secondary relative z-10 inline-block px-3 text-base text-black">
        OR
      </span>
    </span>

    <form (ngSubmit)="handleSubmit()">
      <div class="mb-[22px]">
        <input
          type="text"
          placeholder="Name"
          name="name"
          [(ngModel)]="registerData.name"
          required
          class="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-primary focus-visible:shadow-none text-black"
        />
      </div>
      <div class="mb-[22px]">
        <input
          type="email"
          placeholder="Email"
          name="email"
          [(ngModel)]="registerData.email"
          required
          class="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-primary focus-visible:shadow-none text-black"
        />
      </div>
      <div class="mb-[22px]">
        <input
          type="password"
          placeholder="Password"
          name="password"
          [(ngModel)]="registerData.password"
          required
          class="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-primary focus-visible:shadow-none text-black"
        />
      </div>
      <div class="mb-9">
        <button
          type="submit"
          class="flex w-full items-center text-18 font-medium justify-center rounded-md text-white bg-primary px-5 py-3 text-darkmode transition duration-300 ease-in-out hover:bg-transparent hover:text-primary border-primary border hover:cursor-pointer"
        >
          Sign Up
          <app-loader *ngIf="loading" class="ml-2"></app-loader>
        </button>
      </div>
    </form>

    <p class="text-body-secondary mb-4 text-black text-base">
      By creating an account you are agree with our
      <a routerLink="/" class="text-primary hover:underline">Privacy</a>
      and
      <a routerLink="/" class="text-primary hover:underline">Policy</a>
    </p>

    <p class="text-body-secondary text-black text-base">
      Already have an account?
      <a routerLink="/" class="pl-2 text-primary hover:underline cursor-pointer">
        Sign In
      </a>
    </p>
  `,
})
export class SignUpComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
  };
  loading = false;

  handleSubmit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      alert('Sign Up mocked successfully!');
    }, 1500);
  }
}
