import { computed, Injectable, signal } from '@angular/core';
import { MOCK_CART_DISCOUNT, MOCK_CART_LINES } from '../../modules/cart/data/cart-mock.data';
import { CartDiscount, CartLineItem } from '../../modules/cart/models/cart.model';
import type { CourseDetail } from '../../modules/courses/models/course-catalog.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartLineItem[]>(structuredClone(MOCK_CART_LINES));
  readonly discount = signal<CartDiscount | null>(MOCK_CART_DISCOUNT);

  readonly lines = this.items.asReadonly();

  readonly itemCount = computed(() =>
    this.items().reduce((sum, line) => sum + line.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.items().reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
  );

  readonly discountAmount = computed(() => this.discount()?.amount ?? 0);

  readonly total = computed(() => Math.max(0, this.subtotal() - this.discountAmount()));

  readonly isEmpty = computed(() => this.items().length === 0);

  setLines(lines: CartLineItem[]): void {
    this.items.set(structuredClone(lines));
  }

  updateQuantity(lineId: string, quantity: number): void {
    const q = Math.max(1, Math.floor(quantity));
    this.items.update((rows) =>
      rows.map((row) => (row.id === lineId ? { ...row, quantity: q } : row)),
    );
  }

  removeLine(lineId: string): void {
    this.items.update((rows) => rows.filter((r) => r.id !== lineId));
  }

  clear(): void {
    this.items.set([]);
  }

  /** Add or merge a course line (mock storefront). */
  addFromCourse(course: CourseDetail): void {
    const lineId = `line-${course.id}`;
    this.items.update((rows) => {
      const existing = rows.find((r) => r.courseId === course.id);
      if (existing) {
        return rows.map((r) =>
          r.courseId === course.id ? { ...r, quantity: r.quantity + 1 } : r,
        );
      }
      const next: CartLineItem = {
        id: lineId,
        courseId: course.id,
        title: course.title,
        instructorName: course.instructorName,
        thumbnailUrl: course.thumbnailUrl,
        unitPrice: course.price,
        quantity: 1,
      };
      return [...rows, next];
    });
  }
}
