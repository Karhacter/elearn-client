import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../../layouts/header/logo.component';
import { SocialSignInComponent } from './social-signin.component';
import { LoaderComponent } from '../common/loader.component';

@Component({
  selector: 'app-signin',
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

    <form (ngSubmit)="loginUser()">
      <div class="mb-[22px]">
        <input
          type="email"
          placeholder="Email"
          [(ngModel)]="loginData.email"
          name="email"
          required
          class="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-primary focus-visible:shadow-none text-black"
        />
      </div>
      <div class="mb-[22px]">
        <input
          type="password"
          placeholder="Password"
          [(ngModel)]="loginData.password"
          name="password"
          required
          class="w-full rounded-md border border-solid bg-transparent px-5 py-3 text-base text-dark outline-hidden transition border-gray-200 placeholder:text-black/30 focus:border-primary focus-visible:shadow-none text-black"
        />
      </div>
      <div class="mb-9">
        <button
          type="submit"
          class="bg-primary flex justify-center items-center w-full py-3 rounded-lg text-18 font-medium border text-white border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out"
        >
          Sign In 
          <app-loader *ngIf="loading" class="ml-2"></app-loader>
        </button>
      </div>
    </form>

    <a routerLink="/" class="mb-2 inline-block text-base text-primary hover:underline">
      Forgot Password?
    </a>
    <p class="text-body-secondary text-black text-base">
      Not a member yet?
      <a routerLink="/" class="text-primary hover:underline cursor-pointer">
        Sign Up
      </a>
    </p>
  `,
})
export class SignInComponent {
  loginData = {
    email: '',
    password: '',
  };
  loading = false;

  loginUser() {
    this.loading = true;
    // Mock login delay
    setTimeout(() => {
      this.loading = false;
      alert('Login mocked successfully!');
    }, 1500);
  }
}
