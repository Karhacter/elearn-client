export interface NavItem {
  label: string;
  route?: string;
  href?: string;
}

export interface UserPreview {
  name: string;
  avatarUrl: string;
}

export interface CategoryItem {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface CourseSummary {
  id: string;
  title: string;
  thumbnailUrl: string;
  categoryLabel: string;
  categoryTone: 'cyan' | 'purple' | 'pink' | 'green' | 'orange';
  lessonCount: number;
  rating: number;
  reviewCount: number;
  instructorName: string;
  instructorAvatarUrl: string;
  price: number;
  originalPrice?: number;
}

export interface HomeEventItem {
  id: string;
  dateLabel: string;
  timeRange: string;
  location: string;
  title: string;
  highlighted?: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  audience: string;
  priceMonthly: number;
  priceAnnual: number;
  cycleSuffixMonthly: string;
  cycleSuffixAnnual: string;
  features: string[];
  featured?: boolean;
  featuredBadge?: string;
  ctaLabel: string;
  ctaVariant?: 'solid' | 'outline';
}

export interface SocialLinkItem {
  label: string;
  href: string;
  icon: 'facebook' | 'twitter' | 'pinterest' | 'youtube' | 'discord';
}
