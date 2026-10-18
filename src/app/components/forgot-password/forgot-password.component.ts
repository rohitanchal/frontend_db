import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout.component';
import { isEmail } from '../../shared/form-checks';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink, AuthLayoutComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email = '';
  busy = false;
  error = '';
  notice = '';

  private timer = 0;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => window.clearTimeout(this.timer));
  }

  onEmail(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.email = target.value;
      this.error = '';
    }
  }

  submit(): void {
    if (this.busy) {
      return;
    }
    this.notice = '';
    if (!this.email.trim()) {
      this.error = 'Enter the email address for the account.';
      return;
    }
    if (!isEmail(this.email)) {
      this.error = 'Enter a valid email address.';
      return;
    }
    this.busy = true;
    this.timer = window.setTimeout(() => {
      this.busy = false;
      this.notice = 'Password-reset email will be available after backend integration. No email was sent.';
    }, 650);
  }
}
