import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brand } from '../../brand';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RouterLink, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly brand = brand;
}
