import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/cart';
import { WhishlistService } from '../../core/services/whishlist.service';

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
