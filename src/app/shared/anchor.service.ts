import { ViewportScroller } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnchorService {
  private readonly router = inject(Router);
  private readonly viewport = inject(ViewportScroller);

  constructor() {
    this.viewport.setOffset(() => this.headerOffset());
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const fragment = this.fragmentFromUrl(event.urlAfterRedirects);
        if (fragment) {
          this.scrollToFragment(fragment);
        }
      });

    const initial = window.location.hash.replace(/^#/, '');
    if (initial) {
      this.scrollToFragment(decodeURIComponent(initial));
    }
  }

  /** Scroll when the target section is already on the home page. */
  scrollIfCurrent(anchor: string): void {
    if (this.router.url.split('?')[0].split('#')[0] !== '/') {
      return;
    }
    this.scrollToFragment(anchor);
  }

  private fragmentFromUrl(url: string): string {
    const hashIndex = url.indexOf('#');
    if (hashIndex === -1) {
      return '';
    }
    return decodeURIComponent(url.slice(hashIndex + 1));
  }

  private headerOffset(): [number, number] {
    const nav = document.querySelector('.site-nav');
    const height = nav instanceof HTMLElement ? nav.getBoundingClientRect().height : 72;
    return [0, Math.ceil(height) + 20];
  }

  private scrollToFragment(anchor: string, attempt = 0): void {
    window.setTimeout(() => {
      if (document.getElementById(anchor)) {
        this.viewport.scrollToAnchor(anchor);
        return;
      }
      if (attempt < 8) {
        this.scrollToFragment(anchor, attempt + 1);
      }
    }, attempt === 0 ? 0 : 40);
  }
}
