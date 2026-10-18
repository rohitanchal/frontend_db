import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { brand } from '../../brand';
import { AnchorService } from '../anchor.service';
import { BrandMarkComponent } from '../brand-mark.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, BrandMarkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly brand = brand;
  menuOpen = false;
  scrolled = false;

  private readonly router = inject(Router);
  private readonly anchors = inject(AnchorService);
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    this.scrolled = window.scrollY > 8;
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuOpen = false;
      });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const next = window.scrollY > 8;
    if (next !== this.scrolled) {
      this.scrolled = next;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.menuOpen) {
      return;
    }
    const target = event.target;
    if (target instanceof Node && this.host.nativeElement.contains(target)) {
      return;
    }
    this.menuOpen = false;
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  goToBackup(): void {
    this.closeMenu();
    this.anchors.scrollIfCurrent('backup');
  }
}
