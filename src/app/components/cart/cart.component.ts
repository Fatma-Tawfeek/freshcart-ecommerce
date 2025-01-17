import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private __CartService: CartService,
    private __ToastrService: ToastrService
  ) {}

  getCartSub!: Subscription;
  cartData: ICart | null = null;

  removeCartItem(p_id: string) {
    this.__CartService.removeItemFromCart(p_id).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.__CartService.cartCount.next(res.numOfCartItems);
        this.__ToastrService.success('Item Removed', 'Success');
      },
      error: (err) => console.log(err),
    });
  }

  updateQuantity(p_id: string, count: number) {
    this.__CartService.updateItemQuantity(p_id, count).subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.__ToastrService.success('Quantity Updated', 'Success');
      },
      error: (err) => console.log(err),
    });
  }

  clearCart() {
    this.__CartService.clearAllCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit() {
    this.getCartSub = this.__CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
      },
    });
  }

  ngOnDestroy(): void {
    this.getCartSub?.unsubscribe();
  }
}
