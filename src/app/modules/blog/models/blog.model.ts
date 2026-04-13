export interface BlogPost {
  id: string;
  title: string;
  thumbnail: string;
  /** Card / list excerpt */
  shortDescription: string;
  /** Full article body (plain text paragraphs; safe for template binding) */
  content: string;
  author: string;
  /** ISO date string for sorting */
  date: string;
  /** Category slug used in ?category= */
  category: string;
  /** Tag slugs used in ?tag= */
  tags: string[];
}
