import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { brand } from '../../brand';
import { BrandMarkComponent } from '../../shared/brand-mark.component';
import { DemoFlowService } from '../../shared/demo-flow.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, BrandMarkComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly brand = brand;
  uri = '';
  uriVisible = false;
  menuOpen = false;
  profileOpen = false;
  status = '';
  statusKind: 'idle' | 'error' | 'info' = 'idle';

  private readonly router = inject(Router);
  private readonly demo = inject(DemoFlowService);

  get previewEmail(): string {
    return this.demo.email || 'No email in this preview';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.menuOpen = false;
    this.profileOpen = false;
  }

  onUri(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.uri = target.value;
      this.status = '';
      this.statusKind = 'idle';
    }
  }

  validateConnection(): void {
    const value = this.uri.trim();
    if (!value) {
      this.status = 'Enter a MongoDB connection URI before running a preview check.';
      this.statusKind = 'error';
      return;
    }
    if (!/^mongodb(\+srv)?:\/\//i.test(value)) {
      this.status = 'That value does not look like a MongoDB URI. This preview did not open a connection.';
      this.statusKind = 'error';
      return;
    }
    this.status = 'Connection checks will run on the backend. This preview did not connect to a database.';
    this.statusKind = 'info';
  }

  downloadBackup(): void {
    if (!this.uri.trim()) {
      this.status = 'Enter a MongoDB connection URI before requesting a backup preview.';
      this.statusKind = 'error';
      return;
    }
    this.status = 'ZIP download will be available when backend integration is implemented. No download was started.';
    this.statusKind = 'info';
  }

  leavePreview(): void {
    this.profileOpen = false;
    void this.router.navigate(['/']);
  }
}
