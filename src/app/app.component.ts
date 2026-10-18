import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnchorService } from './shared/anchor.service';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

  constructor() {
    inject(AnchorService);
  }
}
