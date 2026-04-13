/** Single row in the shopping cart (e.g. one course SKU). */
export interface CartLineItem {
  id: string;
  courseId: string;
  title: string;
  instructorName: string;
  thumbnailUrl: string;
  /** Unit price in USD (mock). */
  unitPrice: number;
  /** Seat / license count where applicable (min 1). */
  quantity: number;
}

export interface CartDiscount {
  label: string;
  /** Positive amount subtracted from subtotal. */
  amount: number;
}
