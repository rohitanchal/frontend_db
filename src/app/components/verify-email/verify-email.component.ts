import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout.component';
import { DemoFlowService } from '../../shared/demo-flow.service';
import { OtpInputComponent } from '../../shared/otp-input.component';

@Component({
  selector: 'app-verify-email',
  imports: [FormsModule, RouterLink, AuthLayoutComponent, OtpInputComponent],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent {
  email = '';
  code = '';
  busy = false;
  cooldown = 0;
  error = '';
  notice = '';
  showLogin = false;

  private timer = 0;
  private tick = 0;
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const demo = inject(DemoFlowService);
    const navigationEmail = this.router.getCurrentNavigation()?.extras.state?.['email'];
    const historyEmail = typeof history.state?.email === 'string' ? history.state.email : '';
    const fromNavigation = typeof navigationEmail === 'string' ? navigationEmail : '';
    this.email = (fromNavigation || historyEmail || demo.email).trim();
    this.destroyRef.onDestroy(() => {
      window.clearTimeout(this.timer);
      window.clearInterval(this.tick);
    });
  }

  onCode(value: string): void {
    this.code = value;
    this.error = '';
  }

  verify(): void {
    if (this.busy) {
      return;
    }
    this.notice = '';
    this.showLogin = false;
    if (!/^\d{6}$/.test(this.code)) {
      this.error = 'Enter all six digits. Letters and short codes are not accepted.';
      return;
    }
    this.busy = true;
    this.timer = window.setTimeout(() => {
      this.busy = false;
      this.notice = 'This preview checked that the code has six digits. It did not verify an email with a server.';
      this.showLogin = true;
    }, 650);
  }

  resend(): void {
    if (this.cooldown > 0 || this.busy) {
      return;
    }
    this.error = '';
    this.notice = 'Resend is a static demonstration. No verification email was sent.';
    this.cooldown = 30;
    window.clearInterval(this.tick);
    this.tick = window.setInterval(() => {
      this.cooldown -= 1;
      if (this.cooldown <= 0) {
        this.cooldown = 0;
        window.clearInterval(this.tick);
      }
    }, 1000);
  }
}
