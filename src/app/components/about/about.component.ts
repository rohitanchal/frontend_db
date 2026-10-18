import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brand } from '../../brand';
import { AnchorService } from '../../shared/anchor.service';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RouterLink, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly brand = brand;
  private readonly anchors = inject(AnchorService);

  scrollToBackup(): void {
    this.anchors.scrollIfCurrent('backup');
  }
}
