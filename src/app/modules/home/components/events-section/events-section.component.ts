import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HomeEventItem } from '../../models/home-ui.model';

@Component({
  selector: 'app-events-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-section.component.html',
})
export class EventsSectionComponent {
  @Input() sectionTitle = 'Current Events';
  @Input() highlightWord = 'Events';
  /** When null, copy is derived from `events.length`. */
  @Input() countMessage: string | null = null;
  @Input() events: HomeEventItem[] = [];

  @Output() readonly viewMore = new EventEmitter<HomeEventItem>();

  get titleParts(): { before: string; after: string } {
    const i = this.sectionTitle.indexOf(this.highlightWord);
    if (i < 0) return { before: this.sectionTitle, after: '' };
    return {
      before: this.sectionTitle.slice(0, i),
      after: this.sectionTitle.slice(i + this.highlightWord.length),
    };
  }

  onViewMore(ev: HomeEventItem): void {
    this.viewMore.emit(ev);
  }
}
