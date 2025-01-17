import { Component } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { IOrders } from '../../core/interfaces/orders';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent {
  constructor(private __OrdersService: OrdersService) {}

  ordersData!: IOrders[];

  ngOnInit(): void {
    this.__OrdersService.getUserOrders().subscribe({
      next: (res) => {
        this.ordersData = res.sort((a: IOrders, b: IOrders) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA; // Descending order
        });
      },
      error: (err) => console.log(err),
    });
  }
}
