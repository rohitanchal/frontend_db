import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout.component';
import { DemoFlowService } from '../../shared/demo-flow.service';
import { disposableDemoMessage, isEmail, passwordIssue } from '../../shared/form-checks';
import { PasswordFieldComponent } from '../../shared/password-field.component';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, AuthLayoutComponent, PasswordFieldComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirm = '';
  accepted = false;
  busy = false;
  summary = '';
  notice = '';
  nameError = '';
  emailError = '';
  passwordError = '';
  confirmError = '';
  termsError = '';

  private timer = 0;
  private readonly router = inject(Router);
  private readonly demo = inject(DemoFlowService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.email = this.demo.email;
    this.destroyRef.onDestroy(() => window.clearTimeout(this.timer));
  }

  onText(field: 'name' | 'email', event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    this[field] = target.value;
    this.summary = '';
  }

  createAccount(): void {
    if (this.busy) {
      return;
    }
    this.notice = '';
    if (!this.validate()) {
      return;
    }

    const email = this.email.trim();
    this.busy = true;
    this.notice = 'Registration is a static demonstration. No account was created and no email was sent.';
    this.demo.setEmail(email);
    this.timer = window.setTimeout(() => {
      void this.router.navigate(['/verify-email'], { state: { email } });
    }, 800);
  }

  private validate(): boolean {
    this.nameError = this.name.trim().length >= 2 ? '' : 'Enter your full name.';
    if (!this.email.trim()) {
      this.emailError = 'Enter an email address.';
    } else if (!isEmail(this.email)) {
      this.emailError = 'Enter a valid email address.';
    } else {
      this.emailError = disposableDemoMessage(this.email);
    }
    this.passwordError = passwordIssue(this.password);
    this.confirmError = !this.confirm
      ? 'Confirm your password.'
      : this.confirm === this.password
        ? ''
        : 'Those passwords do not match.';
    this.termsError = this.accepted
      ? ''
      : 'Accept the Terms of Service and Privacy Policy to continue this preview.';

    const invalid = [
      this.nameError,
      this.emailError,
      this.passwordError,
      this.confirmError,
      this.termsError,
    ].some(Boolean);
    this.summary = invalid ? 'Some fields need attention before this preview can continue.' : '';
    return !invalid;
  }
}
