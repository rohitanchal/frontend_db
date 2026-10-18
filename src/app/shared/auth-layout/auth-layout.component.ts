import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { brand } from '../../brand';
import { BrandMarkComponent } from '../brand-mark.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterLink, BrandMarkComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  readonly brand = brand;
}
