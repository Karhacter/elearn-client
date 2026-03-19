import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact">
      <div class="container mx-auto max-w-7xl px-4 py-14">
        <div class="relative max-w-4xl mx-auto">
          <h2 class="mb-9 font-bold tracking-tight text-4xl sm:text-5xl">Get in Touch</h2>
          <form
            (ngSubmit)="handleSubmit()"
            #contactForm="ngForm"
            class="flex flex-wrap w-full m-auto justify-between"
          >
            <div class="sm:flex gap-3 w-full">
              <div class="mx-0 my-2.5 flex-1">
                <label for="fname" class="pb-3 inline-block text-base font-medium">
                  First Name
                </label>
                <input
                  id="fname"
                  type="text"
                  name="firstname"
                  [(ngModel)]="formData.firstname"
                  required
                  placeholder="John"
                  class="w-full text-base px-4 rounded-2xl py-3 border-solid border border-gray-300 transition-all duration-500 focus:border-primary focus:outline-hidden"
                />
              </div>
              <div class="mx-0 my-2.5 flex-1">
                <label for="lname" class="pb-3 inline-block text-base font-medium">
                  Last Name
                </label>
                <input
                  id="lname"
                  type="text"
                  name="lastname"
                  [(ngModel)]="formData.lastname"
                  required
                  placeholder="Doe"
                  class="w-full text-base px-4 rounded-2xl py-3 border-solid border border-gray-300 transition-all duration-500 focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>
            
            <div class="sm:flex gap-3 w-full">
              <div class="mx-0 my-2.5 flex-1">
                <label for="email" class="pb-3 inline-block text-base font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  [(ngModel)]="formData.email"
                  required
                  email
                  placeholder="john.doe@example.com"
                  class="w-full text-base px-4 rounded-2xl py-3 border-solid border border-gray-300 transition-all duration-500 focus:border-primary focus:outline-hidden"
                />
              </div>
              <div class="mx-0 my-2.5 flex-1">
                <label for="Phnumber" class="pb-3 inline-block text-base font-medium">
                  Phone Number
                </label>
                <input
                  id="Phnumber"
                  type="tel"
                  name="phnumber"
                  [(ngModel)]="formData.phnumber"
                  required
                  placeholder="+1234567890"
                  class="w-full text-base px-4 rounded-2xl py-3 border-solid border border-gray-300 transition-all duration-500 focus:border-primary focus:outline-hidden"
                />
              </div>
            </div>

            <div class="w-full mx-0 my-2.5 flex-1">
              <label for="message" class="text-base inline-block font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="Message"
                [(ngModel)]="formData.Message"
                required
                class="w-full mt-2 rounded-2xl px-5 py-3 border-solid border border-gray-300 transition-all duration-500 focus:border-primary focus:outline-hidden min-h-[150px]"
                placeholder="Anything else you wanna communicate"
              ></textarea>
            </div>

            <div class="mx-0 my-2.5 w-full">
              <button
                type="submit"
                [disabled]="!contactForm.form.valid || loader"
                class="border leading-none px-8 text-lg font-medium py-4 rounded-full transition-colors duration-300"
                [ngClass]="(!contactForm.form.valid || loader) ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'"
              >
                Submit
              </button>
            </div>
          </form>
          
          @if (showThanks) {
            <div class="text-white bg-primary rounded-full px-4 py-2 text-lg mb-4 mt-4 inline-flex items-center gap-2 transition-all">
              Thank you for contacting us! We will get back to you soon.
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ContactFormComponent {
  formData = {
    firstname: '',
    lastname: '',
    email: '',
    phnumber: '',
    Message: '',
  };

  showThanks = false;
  loader = false;

  reset() {
    this.formData = {
      firstname: '',
      lastname: '',
      email: '',
      phnumber: '',
      Message: '',
    };
  }

  handleSubmit() {
    this.loader = true;

    // Simulate API call to formsubmit.co
    setTimeout(() => {
      this.loader = false;
      this.showThanks = true;
      this.reset();

      setTimeout(() => {
        this.showThanks = false;
      }, 5000);
    }, 1500);
  }
}
