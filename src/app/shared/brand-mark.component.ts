import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-mark',
  template: `
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#10281f" />
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="7.25" fill="none" stroke="#2ebd8a" />
      <path d="M9.8 12.4v7.4c0 2.2 2.8 3.9 6.2 3.9s6.2-1.7 6.2-3.9v-7.4" fill="#187a54" />
      <ellipse cx="16" cy="12.2" rx="6.2" ry="2.5" fill="#8cf0cc" />
      <ellipse cx="16" cy="12.2" rx="6.2" ry="2.5" fill="none" stroke="#f4fff9" stroke-width="0.8" />
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: 0 0 auto;
    }

    svg {
      display: block;
      width: 1.85rem;
      height: 1.85rem;
    }
  `,
})
export class BrandMarkComponent {}
