import { Component, OnInit, HostListener, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService, HeaderItem } from '../../../core/services/data.service';
import { LogoComponent } from './logo.component';
import { SignInComponent } from '../../components/auth/signin.component';
import { SignUpComponent } from '../../components/auth/signup.component';
import 'iconify-icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, SignInComponent, SignUpComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  headerData: HeaderItem[] = [];
  navbarOpen = false;
  sticky = false;
  isSignInOpen = false;
  isSignUpOpen = false;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getHeaderData().subscribe(data => {
      this.headerData = data;
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.sticky = window.scrollY >= 10;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    this.setBodyOverflow();
  }

  closeNavbar() {
    this.navbarOpen = false;
    this.setBodyOverflow();
  }

  openSignIn() {
    this.isSignInOpen = true;
    this.setBodyOverflow();
  }

  closeSignIn() {
    this.isSignInOpen = false;
    this.setBodyOverflow();
  }

  openSignUp() {
    this.isSignUpOpen = true;
    this.setBodyOverflow();
  }

  closeSignUp() {
    this.isSignUpOpen = false;
    this.setBodyOverflow();
  }

  private setBodyOverflow() {
    if (this.isSignInOpen || this.isSignUpOpen || this.navbarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Handle click outside modal (simple generic approach)
  onModalClick(event: Event, modalType: 'signin' | 'signup') {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      if (modalType === 'signin') this.closeSignIn();
      if (modalType === 'signup') this.closeSignUp();
    }
  }

  scrollTo(href: string, event: Event) {
    event.preventDefault();
    if (href.startsWith('/')) {
      this.router.navigate([href]);
    } else if (href.startsWith('#')) {
      const fragment = href.substring(1);
      this.router.navigate(['/'], { fragment });
    }
    this.closeNavbar();
  }
}
