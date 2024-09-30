import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CardsComponent } from './cards/cards.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'cards',
    component: CardsComponent,
  },
];
