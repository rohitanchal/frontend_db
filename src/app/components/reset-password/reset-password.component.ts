import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout.component';
import { passwordIssue, passwordStrength } from '../../shared/form-checks';
import { PasswordFieldComponent } from '../../shared/password-field.component';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, RouterLink, AuthLayoutComponent, PasswordFieldComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  password = '';
  confirm = '';
  busy = false;
  summary = '';
  notice = '';
  passwordError = '';
  confirmError = '';

  private timer = 0;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => window.clearTimeout(this.timer));
  }

  get strength(): { label: string; level: number } {
    return passwordStrength(this.password);
  }

  reset(): void {
    if (this.busy) {
      return;
    }
    this.notice = '';
    this.passwordError = passwordIssue(this.password);
    this.confirmError = !this.confirm
      ? 'Confirm the new password.'
      : this.confirm === this.password
        ? ''
        : 'Those passwords do not match.';
    if (this.passwordError || this.confirmError) {
      this.summary = 'Some fields need attention before this preview can continue.';
      return;
    }
    this.summary = '';
    this.busy = true;
    this.timer = window.setTimeout(() => {
      this.busy = false;
      this.notice = 'Password reset is a static demonstration. No password was changed, because there is no reset token or account.';
    }, 650);
  }
}
