import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css',
})
export class NavMainComponent {
  constructor(private __Router: Router) {}
  logout(): void {
    sessionStorage.removeItem('token');
    this.__Router.navigate(['/auth/login']);
  }
}
