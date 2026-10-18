import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout.component';
import { isEmail } from '../../shared/form-checks';
import { PasswordFieldComponent } from '../../shared/password-field.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, AuthLayoutComponent, PasswordFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  remember = false;
  busy = false;
  summary = '';
  notice = '';
  emailError = '';
  passwordError = '';

  private timer = 0;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => window.clearTimeout(this.timer));
  }

  onEmail(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.email = target.value;
      this.summary = '';
    }
  }

  signIn(): void {
    if (this.busy) {
      return;
    }
    this.notice = '';
    this.emailError = !this.email.trim()
      ? 'Enter your email address.'
      : isEmail(this.email)
        ? ''
        : 'Enter a valid email address.';
    this.passwordError = this.password ? '' : 'Enter your password.';
    if (this.emailError || this.passwordError) {
      this.summary = 'Some fields need attention before this preview can continue.';
      return;
    }

    this.busy = true;
    this.timer = window.setTimeout(() => {
      this.busy = false;
      this.notice = this.remember
        ? 'Sign-in is a static demonstration. No account was checked, no session was started, and Remember me was not saved.'
        : 'Sign-in is a static demonstration. No account was checked and no session was started.';
    }, 650);
  }
}
