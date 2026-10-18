import { Injectable } from '@angular/core';

/** Holds the email typed in this preview. Never store passwords, OTPs, or tokens. */
@Injectable({ providedIn: 'root' })
export class DemoFlowService {
  email = '';

  setEmail(email: string): void {
    this.email = email.trim();
  }
}
