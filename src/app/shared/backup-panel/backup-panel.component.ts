import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BackupApiService,
  backupErrorMessage,
  backupFilename,
  saveBackup,
} from '../backup-api.service';

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
  downloading = false;
  validationError = '';
  notice = '';
  noticeIsError = false;

  private readonly api = inject(BackupApiService);

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

  requestDownload(): void {
    const uri = this.uri.trim();
    if (!uri) {
      this.validationError = 'Enter a MongoDB connection URI before downloading.';
      this.notice = '';
      return;
    }
    if (this.downloading) {
      return;
    }

    this.validationError = '';
    this.notice = '';
    this.downloading = true;
    this.api.download(uri).subscribe({
      next: (response) => this.finishDownload(response),
      error: (error: HttpErrorResponse) => {
        void this.failDownload(error);
      },
    });
  }

  private finishDownload(response: HttpResponse<Blob>): void {
    this.downloading = false;
    const blob = response.body;
    if (!blob || blob.size === 0) {
      this.noticeIsError = true;
      this.notice = 'The backup response was empty.';
      return;
    }
    saveBackup(blob, backupFilename(response.headers.get('Content-Disposition')));
    this.noticeIsError = false;
    this.notice = 'The backup ZIP downloaded.';
  }

  private async failDownload(error: HttpErrorResponse): Promise<void> {
    this.downloading = false;
    this.noticeIsError = true;
    this.notice = await backupErrorMessage(error);
  }
}
