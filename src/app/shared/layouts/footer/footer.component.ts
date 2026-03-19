import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, FooterLinkType } from '../../../core/services/data.service';
import 'iconify-icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  footerlink: FooterLinkType[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getFooterLinkData().subscribe(data => {
      this.footerlink = data;
    });
  }

  scrollTo(hash: string, event: Event) {
    if (hash && hash.startsWith('#')) {
      event.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
