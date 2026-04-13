export interface AboutStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface AboutFeature {
  id: string;
  title: string;
  description: string;
  /** Lucide-style icon name for template switch */
  icon: 'bolt' | 'shield' | 'users' | 'sparkles';
}

export interface AboutTimelineStep {
  id: string;
  phase: string;
  title: string;
  body: string;
}

export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  socials?: { label: string; href: string }[];
}

export const ABOUT_HERO = {
  eyebrow: 'NeoLearn',
  title: 'Skills that glow on your résumé—and in production.',
  intro:
    'We are a learning network built for builders who want depth, speed, and a little voltage. From Angular to ML to motion design, every path is crafted to ship—not just to scroll.',
  ctaPrimary: 'Explore courses',
  ctaSecondary: 'Sign up free',
};

export const ABOUT_STORY = {
  mission:
    'Democratize serious technical education with courses that respect your time—SSR-fast sites, accessible UI, and instructors who still ship.',
  vision:
    'A global bench of learners who finish what they start: portfolios, certifications, and real releases—not abandoned tabs.',
};

export const ABOUT_TIMELINE: AboutTimelineStep[] = [
  {
    id: 't1',
    phase: '2023',
    title: 'Spark',
    body: 'NeoLearn started as a night-weekend cohort for Angular and Tailwind builders tired of outdated tutorials.',
  },
  {
    id: 't2',
    phase: '2024',
    title: 'Scale',
    body: 'We opened the library—data, design, devops—and built the neon design system you see across the product today.',
  },
  {
    id: 't3',
    phase: '2025–26',
    title: 'Orbit',
    body: 'Teams joined: live critiques, mentor rubrics, and SSR-first delivery so learners never wait on a blank screen.',
  },
];

export const ABOUT_FEATURES: AboutFeature[] = [
  {
    id: 'f1',
    icon: 'bolt',
    title: 'Ship-ready curricula',
    description:
      'Lessons mirror real tickets: routing, auth-shaped flows, deploy checklists—not toy to-do apps you will never ship.',
  },
  {
    id: 'f2',
    icon: 'shield',
    title: 'Accessible by default',
    description:
      'Contrast-tested dark skins, reduced-motion paths, and focus rings that survive WCAG reviews without killing the vibe.',
  },
  {
    id: 'f3',
    icon: 'users',
    title: 'Humans in the loop',
    description:
      'Mentors, cohort rooms, and async rubrics so feedback scales without turning into generic autograding noise.',
  },
  {
    id: 'f4',
    icon: 'sparkles',
    title: 'Cyber polish, calm UX',
    description:
      'Neon accents and soft glow when they guide attention—not when they compete with your notes or code.',
  },
];

export const ABOUT_STATS: AboutStat[] = [
  { id: 'st1', label: 'Active learners', value: 48200, suffix: '+' },
  { id: 'st2', label: 'Courses live', value: 186, suffix: '+' },
  { id: 'st3', label: 'Expert instructors', value: 94, suffix: '+' },
  { id: 'st4', label: 'Countries represented', value: 62, suffix: '' },
];

export const ABOUT_TEAM: AboutTeamMember[] = [
  {
    id: 'm1',
    name: 'Mira Vance',
    role: 'Principal Educator, Platform',
    avatarUrl: 'https://i.pravatar.cc/320?img=32',
    socials: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com' },
      { label: 'GitHub', href: 'https://github.com' },
    ],
  },
  {
    id: 'm2',
    name: 'Rin Okada',
    role: 'Design Systems & UI',
    avatarUrl: 'https://i.pravatar.cc/320?img=11',
    socials: [
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'Dribbble', href: 'https://dribbble.com' },
    ],
  },
  {
    id: 'm3',
    name: 'Dr. Elara',
    role: 'Data & ML Programs',
    avatarUrl: 'https://i.pravatar.cc/320?img=9',
    socials: [{ label: 'LinkedIn', href: 'https://www.linkedin.com' }],
  },
  {
    id: 'm4',
    name: 'Jordan Lee',
    role: 'Growth & Partnerships',
    avatarUrl: 'https://i.pravatar.cc/320?img=15',
    socials: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com' },
      { label: 'Email', href: 'mailto:hello@neolearn.dev' },
    ],
  },
];
