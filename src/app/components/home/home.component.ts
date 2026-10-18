import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { brand } from '../../brand';
import { AnchorService } from '../../shared/anchor.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, RevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly brand = brand;
  uri = '';
  uriVisible = false;
  validationError = '';
  notice = '';

  private readonly anchors = inject(AnchorService);

  get describedBy(): string {
    const ids = ['uri-privacy'];
    if (this.validationError) {
      ids.unshift('uri-error');
    }
    if (this.notice) {
      ids.push('uri-notice');
    }
    return ids.join(' ');
  }

  scrollTo(anchor: string): void {
    this.anchors.scrollIfCurrent(anchor);
  }

  onUriInput(): void {
    if (this.uri.trim()) {
      this.validationError = '';
      return;
    }
    this.notice = '';
  }

  toggleUriVisibility(): void {
    this.uriVisible = !this.uriVisible;
  }

  // Static preview only. Do not log, echo, or transmit the connection URI.
  requestDownload(): void {
    if (!this.uri.trim()) {
      this.validationError = 'Enter a MongoDB connection URI before downloading.';
      this.notice = '';
      return;
    }

    this.validationError = '';
    this.notice =
      'Database export will be available when backend integration is implemented. No download was started, and the connection URI was not sent.';
  }
}
