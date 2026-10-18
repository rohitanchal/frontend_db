import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  @Input() appRevealDelay = 0;

  ngAfterViewInit(): void {
    const node = this.host.nativeElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.renderer.addClass(node, 'reveal');
    this.renderer.setStyle(node, '--reveal-delay', `${this.appRevealDelay}ms`);

    const show = (): void => {
      this.renderer.addClass(node, 'is-visible');
    };

    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      show();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 12% 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
