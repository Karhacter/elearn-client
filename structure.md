src/app/
├── core/ # singleton & global
│ ├── services/ # auth, api base
│ ├── guards/
│ ├── interceptors/
│ └── models/ # user, token
│
├── shared/ # reusable UI
│ ├── components/ # button, modal, card
│ ├── directives/
│ ├── pipes/
│ └── layouts/ # main layout, admin layout
│
├── modules/ # feature-based (MAIN)
│ ├── home/
│ │ ├── pages/
│ │ ├── components/
│ │ └── home-routing.module.ts
│
│ ├── courses/
│ │ ├── pages/
│ │ │ ├── course-list/
│ │ │ └── course-detail/
│ │ │
│ │ ├── components/
│ │ │ ├── course-card/
│ │ │ ├── course-filter/
│ │ │ └── course-sidebar/
│ │ │
│ │ ├── services/ # 💡 use-case layer nhẹ
│ │ │ └── course.service.ts
│ │ │
│ │ ├── models/ # 💡 domain nhẹ
│ │ │ ├── course.model.ts
│ │ │ └── lesson.model.ts
│ │ │
│ │ ├── repositories/ # 💡 optional nâng cao
│ │ │ ├── course.repository.ts
│ │ │ └── course.repository.impl.ts
│ │ │
│ │ └── courses-routing.module.ts
│
│ ├── dashboard/
│ └── auth/
│
├── data/ # mock data
├── theme/ # tailwind / scss
