import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AnchorService } from './shared/anchor.service';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

const BARE_PATHS = new Set([
  '/register',
  '/verify-email',
  '/login',
  '/forgot-password',
  '/reset-password',
  '/dashboard',
]);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  bare = false;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    inject(AnchorService);
    this.syncShell();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.syncShell());
  }

  private syncShell(): void {
    let current = this.route.snapshot;
    while (current.firstChild) {
      current = current.firstChild;
    }
    if (current.data['bare'] === true || current.data['bare'] === false) {
      this.bare = current.data['bare'] === true;
      return;
    }
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    this.bare = BARE_PATHS.has(path);
  }
}
