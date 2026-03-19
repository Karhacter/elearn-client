import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'documentation', loadComponent: () => import('./features/documentation/documentation.component').then(m => m.DocumentationComponent) },
];
