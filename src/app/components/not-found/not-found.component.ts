import { Component } from '@angular/core';
import { NavAuthComponent } from '../nav-auth/nav-auth.component';
import { NavMainComponent } from '../nav-main/nav-main.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NavAuthComponent, NavMainComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  token: any = sessionStorage.getItem('token');
}
