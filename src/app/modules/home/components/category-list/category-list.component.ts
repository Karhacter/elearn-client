import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryItem } from '../../models/home-ui.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
  @Input() sectionTitle = 'Explore categories';
  @Input() highlightWord = 'categories';
  @Input() subtitle = 'Swipe through tracks tuned for cyber builders and creative devs.';
  @Input() viewAllLabel = 'View all';
  @Input() categories: CategoryItem[] = [];

  @Output() readonly categorySelect = new EventEmitter<CategoryItem>();
  @Output() readonly viewAll = new EventEmitter<void>();

  onSelect(cat: CategoryItem): void {
    this.categorySelect.emit(cat);
  }

  onViewAll(): void {
    this.viewAll.emit();
  }

  get titleParts(): { before: string; after: string } {
    const i = this.sectionTitle.indexOf(this.highlightWord);
    if (i < 0) {
      return { before: this.sectionTitle, after: '' };
    }
    return {
      before: this.sectionTitle.slice(0, i),
      after: this.sectionTitle.slice(i + this.highlightWord.length),
    };
  }
}
