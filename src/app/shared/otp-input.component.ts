import { AfterViewInit, Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-otp-input',
  template: `
    <div class="otp-grid" role="group" aria-label="Six-digit verification code">
      @for (digit of digits; track $index) {
        <input
          #box
          [id]="'otp-' + $index"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="1"
          [value]="digit"
          [attr.aria-label]="'Digit ' + ($index + 1) + ' of 6'"
          (input)="onInput($index, $event)"
          (keydown)="onKeydown($index, $event)"
          (paste)="onPaste($event)"
        />
      }
    </div>
  `,
})
export class OtpInputComponent implements AfterViewInit {
  @Output() codeChange = new EventEmitter<string>();
  @ViewChildren('box') private boxes!: QueryList<ElementRef<HTMLInputElement>>;

  digits = ['', '', '', '', '', ''];

  ngAfterViewInit(): void {
    this.focus(0);
  }

  onInput(index: number, event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    const digit = target.value.replace(/\D/g, '').slice(-1);
    this.digits[index] = digit;
    target.value = digit;
    if (digit && index < this.digits.length - 1) {
      this.focus(index + 1);
    }
    this.emit();
  }

  onKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      if (this.digits[index]) {
        this.digits[index] = '';
        this.emit();
        return;
      }
      if (index > 0) {
        event.preventDefault();
        this.digits[index - 1] = '';
        this.focus(index - 1);
        this.emit();
      }
      return;
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focus(index - 1);
    }
    if (event.key === 'ArrowRight' && index < this.digits.length - 1) {
      event.preventDefault();
      this.focus(index + 1);
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, this.digits.length);
    this.digits = this.digits.map((_, index) => text[index] ?? '');
    this.focus(Math.min(text.length, this.digits.length - 1));
    this.emit();
  }

  private emit(): void {
    this.codeChange.emit(this.digits.join(''));
  }

  private focus(index: number): void {
    this.boxes?.get(index)?.nativeElement.focus();
  }
}
