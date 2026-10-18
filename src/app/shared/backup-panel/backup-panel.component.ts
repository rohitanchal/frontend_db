import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-backup-panel',
  imports: [FormsModule],
  templateUrl: './backup-panel.component.html',
  styleUrl: './backup-panel.component.css',
})
export class BackupPanelComponent {
  @Input() downloadLabel = 'Download ZIP';

  uri = '';
  uriVisible = false;
  validationError = '';
  notice = '';

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
