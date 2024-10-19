import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadComponent: () => import('./features/heroes/heroes.component').then(c => c.HeroesComponent)
  },
  {
    path: 'hero/:id', loadComponent: () => import('./features/hero-detail/hero-detail.component').then(c => c.HeroDetailComponent)

  }
];
