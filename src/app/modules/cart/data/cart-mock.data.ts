import { CartDiscount, CartLineItem } from '../models/cart.model';

/** Initial cart payload (mock JSON). */
export const MOCK_CART_LINES: CartLineItem[] = [
  {
    id: 'line-c-feat',
    courseId: 'c-feat',
    title: 'Full-Stack Angular in the Neon Age',
    instructorName: 'Mira Vance',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80',
    unitPrice: 89,
    quantity: 1,
  },
  {
    id: 'line-c1',
    courseId: 'c1',
    title: 'Cyber UI Systems with Tailwind & Angular',
    instructorName: 'Rin Okada',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    unitPrice: 59,
    quantity: 2,
  },
];

export const MOCK_CART_DISCOUNT: CartDiscount = {
  label: 'NEONLAUNCH — early access',
  amount: 15,
};
