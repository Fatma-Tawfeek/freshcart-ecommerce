import { Component } from '@angular/core';
import { WhishlistService } from '../../core/services/whishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.css',
})
export class WhishlistComponent {
  constructor(
    private __WhishlistService: WhishlistService,
    private __ToastrService: ToastrService,
    private __CarteService: CartService
  ) {}

  whishlistData!: any;
  whishlistIds!: string[];

  removeFromWishlist(p_id: string) {
    this.__WhishlistService.removeItemFromWishlist(p_id).subscribe({
      next: (res) => {
        this.__ToastrService.success(res.message, 'Success');
      },
    });
  }

  addCartItem(p_id: string): void {
    this.__CarteService.addItemToCart(p_id).subscribe({
      next: (res) => {
        this.__ToastrService.success(res.message, 'Success');
      },
    });
  }

  ngOnInit(): void {
    this.__WhishlistService.getWishlist().subscribe({
      next: (res) => {
        this.whishlistData = res.data;
      },
    });
  }
}
