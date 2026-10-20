import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface BackupDownload {
  blob: Blob;
  filename: string;
}

@Injectable({ providedIn: 'root' })
export class BackupApiService {
  private readonly http = inject(HttpClient);

  download(uri: string): Observable<HttpResponse<Blob>> {
    return this.http.post(backupApiUrl('/api/backup/download'), { uri }, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}

const LIVE_API = 'https://mongovault-droz.onrender.com';

export function backupApiUrl(path: string): string {
  const host = globalThis.location?.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return path;
  }
  return `${LIVE_API}${path}`;
}

export function backupFilename(header: string | null): string {
  const match = /filename="([^"]+\.zip)"/.exec(header ?? '');
  return match?.[1] ?? 'mongovault-backup.zip';
}

export async function backupErrorMessage(error: HttpErrorResponse): Promise<string> {
  if (error.status === 0) {
    return 'The backup service is unreachable. Start the API and try again.';
  }

  const raw = error.error instanceof Blob ? await error.error.text() : '';
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { message?: unknown };
      if (typeof parsed.message === 'string' && parsed.message.trim() && !/mongodb(\+srv)?:\/\//i.test(parsed.message)) {
        return parsed.message.trim();
      }
    } catch {
      // The body was not the API's JSON error.
    }
  }

  return 'Unable to create the database backup.';
}

export function saveBackup(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
