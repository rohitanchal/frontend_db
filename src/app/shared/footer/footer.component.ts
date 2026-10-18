import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { brand } from '../../brand';
import { BrandMarkComponent } from '../brand-mark.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive, BrandMarkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly brand = brand;
  readonly year = new Date().getFullYear();
}
