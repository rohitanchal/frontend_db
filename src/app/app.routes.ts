import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'MongoVault' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about-us', component: AboutComponent, title: 'About Us · MongoVault' },
  { path: 'get-started', component: GetStartedComponent, title: 'Get Started · MongoVault' },
  { path: 'login', redirectTo: '', pathMatch: 'full' },
  { path: 'register', redirectTo: '', pathMatch: 'full' },
  { path: 'verify-email', redirectTo: '', pathMatch: 'full' },
  { path: 'forgot-password', redirectTo: '', pathMatch: 'full' },
  { path: 'reset-password', redirectTo: '', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  { path: 'profile', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
