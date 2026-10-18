import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brand } from '../../brand';
import { AnchorService } from '../../shared/anchor.service';
import { BackupPanelComponent } from '../../shared/backup-panel/backup-panel.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RevealDirective, BackupPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly brand = brand;

  private readonly anchors = inject(AnchorService);

  scrollTo(anchor: string): void {
    this.anchors.scrollIfCurrent(anchor);
  }
}
