import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'MongoVault' },
  { path: 'about-us', component: AboutComponent, title: 'About Us · MongoVault' },
  { path: 'register', component: RegisterComponent, title: 'Create account · MongoVault', data: { bare: true } },
  { path: 'verify-email', component: VerifyEmailComponent, title: 'Verify email · MongoVault', data: { bare: true } },
  { path: 'login', component: LoginComponent, title: 'Sign in · MongoVault', data: { bare: true } },
  { path: 'forgot-password', component: ForgotPasswordComponent, title: 'Forgot password · MongoVault', data: { bare: true } },
  { path: 'reset-password', component: ResetPasswordComponent, title: 'Reset password · MongoVault', data: { bare: true } },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard preview · MongoVault', data: { bare: true } },
  { path: '**', component: NotFoundComponent, title: 'Page not found · MongoVault' },
];
