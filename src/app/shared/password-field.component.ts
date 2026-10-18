import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-password-field',
  template: `
    <label class="field-label" [attr.for]="inputId">{{ label }}</label>
    <div class="secret-field" [class.is-invalid]="!!error">
      <input
        [id]="inputId"
        [type]="visible ? 'text' : 'password'"
        [value]="value"
        (input)="onInput($event)"
        [attr.autocomplete]="autocomplete"
        [attr.aria-invalid]="error ? true : null"
        [attr.aria-describedby]="error ? describedBy : null"
        [attr.aria-required]="true"
      />
      <button
        type="button"
        class="eye-btn"
        (click)="visible = !visible"
        [attr.aria-pressed]="visible"
        [attr.aria-label]="visible ? 'Hide ' + label : 'Show ' + label"
      >
        @if (visible) {
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 3l18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            <path d="M10.6 6.2A11 11 0 0 1 12 6c6.5 0 10 6 10 6a18 18 0 0 1-3.1 3.7M6.2 6.9C3.8 8.6 2 12 2 12s3.5 6 10 6c1.2 0 2.4-.2 3.5-.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        } @else {
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" fill="none" stroke="currentColor" stroke-width="1.6" />
            <circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6" />
          </svg>
        }
      </button>
    </div>
    @if (error) {
      <p class="field-error" [id]="describedBy">{{ error }}</p>
    }
  `,
})
export class PasswordFieldComponent {
  @Input() label = 'Password';
  @Input() inputId = 'password';
  @Input() value = '';
  @Input() error = '';
  @Input() autocomplete = 'current-password';
  @Output() valueChange = new EventEmitter<string>();

  visible = false;

  get describedBy(): string {
    return `${this.inputId}-error`;
  }

  onInput(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    this.value = target.value;
    this.valueChange.emit(target.value);
  }
}
