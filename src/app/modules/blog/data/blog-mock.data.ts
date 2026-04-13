import { BlogPost } from '../models/blog.model';

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-neon-ssr',
    title: 'Neon SSR: shipping Angular without losing the glow',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=960&q=80',
    shortDescription:
      'Hydration, route-level rendering modes, and the checklist we use before flipping production to prerender.',
    content: `Server components and client hydration can feel like a trade-off against flashy UI. In practice, a disciplined SSR pass actually makes neon accents and motion safer—you ship meaningful paint first, then layer effects once the document is stable.

We start by auditing every route for data that must exist on first byte versus what can wait for the browser. Marketing and blog surfaces almost always qualify for prerender; personalized dashboards stay server-rendered or client-only.

The second pass is style: critical above-the-fold gradients inlined where needed, with Tailwind dark variants validated under forced-colors and contrast checks. Finally we gate animations behind prefers-reduced-motion so the cyberpunk vibe never becomes a accessibility regression.

When the checklist is green, we flip the route to prerender, watch Core Web Vitals for a week, and only then promote heavier hero effects. The glow stays—but it lands after content, not instead of it.`,
    author: 'Mira Vance',
    date: '2026-03-18',
    category: 'engineering',
    tags: ['angular', 'ssr', 'performance'],
  },
  {
    id: 'b-signals-ui',
    title: 'Signals + Tailwind: state that does not thrash the DOM',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=960&q=80',
    shortDescription:
      'Fine-grained reactivity pairs well with utility CSS—patterns for derived UI state and fewer change-detection surprises.',
    content: `Angular signals give you a single graph of derived state instead of scattering flags across components. When Tailwind classes depend on that state, the win is straightforward: update one signal, recompute class maps in a pure function, and let the template stay dumb.

We keep visual state—hover, focus, open/closed—in the template or tiny directives, and push business rules into signal computeds. That split mirrors how we structure Tailwind: layout and skin in the template, behavior in TypeScript.

For cyberpunk dashboards, we often derive a "tone" signal from theme + route segment, then map tone to gradient and border utilities. The result reads as intentional neon without hand-editing twenty *ngIf branches.

If you are migrating from RxJS-heavy components, interop is your friend: pick the smallest surface to convert first, prove the graph, then delete the old BehaviorSubject. The UI should get calmer even as the aesthetic gets louder.`,
    author: 'Rin Okada',
    date: '2026-03-02',
    category: 'engineering',
    tags: ['angular', 'tailwind', 'signals'],
  },
  {
    id: 'b-cohort-onboarding',
    title: 'Designing cohort onboarding that feels like a launch party',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=960&q=80',
    shortDescription:
      'Rituals, async intros, and neon-branded milestones that help learners commit without burning out moderators.',
    content: `Cohort courses live or die on week-one momentum. We treat onboarding as a three-act play: orientation, first win, and social proof—not a wall of PDFs.

Orientation is async-first: short Looms, a single checklist, and a pinned thread where instructors model curiosity. The first win lands inside 48 hours—something shippable even if tiny—so learners feel progress before doubt sets in.

Milestones get lightweight ceremony: gradient badges, optional voice notes from alumni, and clear "you are on track" signals in the product. Moderators should spend time on feedback, not repeating logistics.

Optional cyberpunk theming helps when it reinforces time-boxed energy: a "countdown to capstone" banner beats a generic progress bar. Keep the drama in the brand layer; keep the pedagogy boringly reliable underneath.`,
    author: 'Yuki Tan',
    date: '2026-02-20',
    category: 'product',
    tags: ['onboarding', 'community', 'ux'],
  },
  {
    id: 'b-pricing-experiments',
    title: 'Pricing experiments for learning products (without enraging finance)',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=960&q=80',
    shortDescription:
      'Guardrails, instrumentation, and copy tests we run before touching list price on education SKUs.',
    content: `Finance teams are right to be wary of random discounts. Our rule is simple: every price test has a hypothesis, a primary metric, and a kill switch date before launch.

We instrument the full funnel—visit, trial start, activation lesson, payment—not just checkout. Education products often convert late; optimizing only for purchase misses the story.

Copy tests run ahead of price moves. Sometimes "annual" framing beats a lower monthly because learners anchor on career outcomes, not subscription math. When we do adjust price, we bundle it with a visible content drop so the change feels earned.

Reporting stays boring: spreadsheet + dashboard, no neon charts in the board deck. Save the glow for the learner-facing product; keep finance interfaces legible.`,
    author: 'Jordan Lee',
    date: '2026-02-07',
    category: 'growth',
    tags: ['pricing', 'experimentation', 'saas'],
  },
  {
    id: 'b-a11y-motion',
    title: 'Accessible motion for high-contrast neon interfaces',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=960&q=80',
    shortDescription:
      'Reduced motion, focus rings, and glow that survives WCAG checks—patterns from shipping dark-first course UIs.',
    content: `Neon aesthetics tempt teams into pulsing gradients and infinite loops. The fix is not "less motion" but motion with consent: respect prefers-reduced-motion, offer a theme toggle, and cap durations.

Focus rings need love in dark skins. We use dual-ring treatments: an inner high-contrast ring and an outer glow that degrades gracefully when Windows high-contrast mode flips.

Color is the harder lesson. Cyan-on-charcoal looks slick until you measure against APCA. We pair every accent with a fallback text color and test both light and dark stacks.

Ship a checklist in your design system: contrast tokens, motion tokens, focus tokens. Authors pick from the list; they do not invent raw hex values in PRs. The cyberpunk vibe holds because the guardrails are boring.`,
    author: 'Nova Kim',
    date: '2026-01-28',
    category: 'design',
    tags: ['a11y', 'motion', 'dark-mode'],
  },
  {
    id: 'b-mentor-feedback',
    title: 'Scaling mentor feedback with async rubrics',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=960&q=80',
    shortDescription:
      'Rubrics, snippets, and SLA timers that keep human feedback human—even when volume doubles.',
    content: `Async programs scale until mentor queues blow up. Rubrics are the lever: shared criteria, visible to learners, so feedback stays consistent and faster to write.

We give mentors three snippet tiers—praise, course-correction, push—and let them personalize in one sentence. SLAs are transparent; learners see expected turnaround so anxiety drops.

Tooling should surface queue health without shame. Managers watch median response time, not individual leaderboard stats, to avoid gamifying speed over quality.

Optional neon touches—subtle status chips for "in review"—help learners orient without turning support into a game HUD. The emotional goal is trust, not spectacle.`,
    author: 'Dr. Elara',
    date: '2026-01-12',
    category: 'product',
    tags: ['mentorship', 'operations', 'quality'],
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return MOCK_BLOG_POSTS.find((p) => p.id === id);
}

export function blogCategoriesFromPosts(posts: BlogPost[]): { slug: string; label: string }[] {
  const map = new Map<string, string>();
  for (const p of posts) {
    if (!map.has(p.category)) {
      map.set(p.category, labelForCategorySlug(p.category));
    }
  }
  return [...map.entries()].map(([slug, label]) => ({ slug, label })).sort((a, b) => a.label.localeCompare(b.label));
}

export function blogTagsFromPosts(posts: BlogPost[]): { slug: string; label: string }[] {
  const map = new Map<string, string>();
  for (const p of posts) {
    for (const t of p.tags) {
      if (!map.has(t)) {
        map.set(t, labelForTagSlug(t));
      }
    }
  }
  return [...map.entries()].map(([slug, label]) => ({ slug, label })).sort((a, b) => a.label.localeCompare(b.label));
}

function labelForCategorySlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function labelForTagSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function recentBlogPosts(posts: BlogPost[], limit = 5): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
