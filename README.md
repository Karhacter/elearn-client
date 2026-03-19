<div align="center">

# 🎓 ELearn Client

**A modern e-learning platform template built with Angular, TailwindCSS, and TypeScript.**

![Angular](https://img.shields.io/badge/Angular-21.x-red?logo=angular)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## ✨ Features

- 🏠 **Home Page** — Hero, Courses, Mentors, Testimonials, and Contact sections
- 📖 **Documentation Page** — Fully navigable in-app documentation with sticky sidebar
- 🔐 **Auth Modals** — Sign In / Sign Up modal dialogs
- 📱 **Responsive Design** — Mobile-first layout with slide-out navigation drawer
- 🎨 **Tailwind CSS v4** — Custom color tokens, typography, and utility-first styling
- ⚡ **Lazy Loading** — Routes loaded on demand (e.g., `/documentation`)
- 🌐 **SSR Ready** — Angular Universal server-side rendering

---

## 🧰 Tech Stack

| Technology | Version |
|---|---|
| Angular | 21.x |
| Angular SSR | 21.x |
| TailwindCSS | 4.x |
| TypeScript | ~5.9 |
| Iconify | 3.x |
| Swiper.js | 12.x |

---

## 📁 Project Structure

```
elearn-client/
├── public/                  # Static assets (images, SVGs)
│   └── images/
│       ├── courses/
│       ├── documentation/
│       └── ...
├── src/
│   ├── app/
│   │   ├── core/            # Services and data models
│   │   ├── features/        # Page-level feature modules
│   │   │   ├── home/        # Home page components
│   │   │   └── documentation/ # Documentation page & sub-components
│   │   ├── shared/          # Shared layouts (Header, Footer)
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── styles.css
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20+ — [Download](https://nodejs.org/)
- **npm** v10+
- **Angular CLI** v21+ (optional, for scaffolding)

```bash
npm install -g @angular/cli
```

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd elearn-client

# 2. Install dependencies
npm install
```

### Development Server

```bash
npm start
```

Open your browser at **http://localhost:4200**. The app hot-reloads on file changes.

### Production Build

```bash
npm run build
```

Output will be placed in the `dist/elearn-client` directory.

---

## 🛣️ Routes

| Path | Component | Description |
|---|---|---|
| `/` | `HomeComponent` | Main landing page |
| `/documentation` | `DocumentationComponent` | In-app documentation (lazy loaded) |

---

## 🧪 Testing

Run unit tests using [Vitest](https://vitest.dev/):

```bash
ng test
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
