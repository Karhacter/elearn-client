import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface HeaderItem {
  label: string;
  href: string;
}

export interface FooterLinkType {
  section: string;
  links: { label: string; href: string }[];
}

export interface CourseDetailType {
  course: string;
  imageSrc: string;
  profession: string;
  price: string;
  category: 'webdevelopment' | 'mobiledevelopment' | 'datascience' | 'cloudcomputing';
}

export interface MentorType {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  color: string;
}

export interface TestimonialType {
  profession: string;
  name: string;
  imgSrc: string;
  starimg: string;
  detail: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headerData: HeaderItem[] = [
    { label: 'Home', href: '#Home' },
    { label: 'Courses', href: '#courses-section' },
    { label: 'Mentors', href: '#mentors-section' },
    { label: 'Testimonial', href: '#testimonial-section' },
    { label: 'Join', href: '#join-section' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Docs', href: '/documentation' },
  ];

  private footerLinkData: FooterLinkType[] = [
    {
      section: 'Company',
      links: [
        { label: 'Home', href: '#Home' },
        { label: 'Courses', href: '#courses-section' },
        { label: 'Mentors', href: '#mentors-section' },
        { label: 'Testimonial', href: '#testimonial-section' },
        { label: 'Join', href: '#join-section' },
        { label: 'Contact Us', href: '#contact' },
      ],
    },
    {
      section: 'Support',
      links: [
        { label: 'Help center', href: 'javascript:void(0)' },
        { label: 'Terms of service', href: 'javascript:void(0)' },
        { label: 'Legal', href: 'javascript:void(0)' },
        { label: 'Privacy Policy', href: 'javascript:void(0)' },
        { label: 'Status', href: 'javascript:void(0)' },
      ],
    },
  ];

  private courseDetailData: CourseDetailType[] = [
    { course: 'HTML, CSS, JS', imageSrc: '/images/courses/coursesOne.svg', profession: 'HTML, CSS, Javascript Development', price: '40', category: 'webdevelopment' },
    { course: 'Node.js', imageSrc: '/images/courses/coursesTwo.svg', profession: 'Backend with Node.js and Express.js', price: '21', category: 'webdevelopment' },
    { course: 'React Native', imageSrc: '/images/courses/coursesOne.svg', profession: 'Learn React Native with Node.js', price: '89', category: 'mobiledevelopment' },
    { course: 'AWS', imageSrc: '/images/courses/coursesFour.svg', profession: 'AWS Deep Learning AMI', price: '99', category: 'datascience' },
  ];

  private mentorData: MentorType[] = [
    { name: 'Senior UX Designer', href: '#', imageSrc: '/images/mentor/boy1.svg', imageAlt: 'boy1', color: 'Shoo Thar Mein' },
    { name: 'Photoshop Instructor', href: '#', imageSrc: '/images/mentor/boy2.svg', imageAlt: 'boy2', color: 'Cristian Doru Barin' },
  ];

  private companiesData: { imgSrc: string }[] = [
    { imgSrc: '/images/slickCompany/airbnb.svg' },
    { imgSrc: '/images/slickCompany/hubspot.svg' },
    { imgSrc: '/images/slickCompany/microsoft.svg' },
    { imgSrc: '/images/slickCompany/google.svg' },
    { imgSrc: '/images/slickCompany/walmart.svg' },
    { imgSrc: '/images/slickCompany/fedex.svg' },
  ];

  private testimonialData: TestimonialType[] = [
    { profession: 'UX/UI Designer', name: 'Andrew Williams', imgSrc: '/images/testimonial/user-1.jpg', starimg: '/images/testimonial/stars.png', detail: 'This course is so great!' },
    { profession: 'UX/UI Designer', name: 'Cristian Doru', imgSrc: '/images/testimonial/user-2.jpg', starimg: '/images/testimonial/stars.png', detail: 'This course is so great!' },
  ];

  getHeaderData(): Observable<HeaderItem[]> {
    return of(this.headerData);
  }

  getFooterLinkData(): Observable<FooterLinkType[]> {
    return of(this.footerLinkData);
  }

  getCourseDetailData(): Observable<CourseDetailType[]> {
    return of(this.courseDetailData);
  }

  getMentorData(): Observable<MentorType[]> {
    return of(this.mentorData);
  }

  getCompaniesData(): Observable<{ imgSrc: string }[]> {
    return of(this.companiesData);
  }

  getTestimonialData(): Observable<TestimonialType[]> {
    return of(this.testimonialData);
  }
}
