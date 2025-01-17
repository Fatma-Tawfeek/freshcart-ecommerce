import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../../core/services/whishlist.service';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { IWishlist } from '../../core/interfaces/whishlist';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, FormsModule, SearchPipe, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  whishlistData!: IWishlist[];
  whishlistIds!: string[];
  products!: IProduct[];
  productSub!: Subscription;
  catSub!: Subscription;
  searchInput: string = '';
  currentPage!: number;
  numOfPages!: number;
  constructor(
    private __CarteService: CartService,
    private __ProductService: ProductsService,
    private __WhishlistService: WhishlistService,
    private __ToastrService: ToastrService,
    private __ActivatedRoute: ActivatedRoute
  ) {}
  addCartItem(p_id: string): void {
    this.__CarteService.addItemToCart(p_id).subscribe({
      next: (res) => {
        this.__CarteService.cartCount.next(res.numOfCartItems);
        this.__ToastrService.success(res.message, 'Success');
      },
    });
  }

  addToWishlist(p_id: string) {
    this.__WhishlistService.addItemToWishlist(p_id).subscribe({
      next: (res) => {
        this.__ToastrService.success(res.message, 'Success');
        this.whishlistIds = res.data;
      },
    });
  }

  removeFromWishlist(p_id: string) {
    this.__WhishlistService.removeItemFromWishlist(p_id).subscribe({
      next: (res) => {
        this.__ToastrService.success(res.message, 'Success');
        this.whishlistIds = res.data;
      },
    });
  }

  isProductInWishlist(productId: string): boolean {
    return this.whishlistIds.includes(productId);
  }

  getPageByNumber(page: number) {
    this.catSub = this.__ProductService.getProducts(page).subscribe({
      next: (res) => {
        this.currentPage = res.metadata.currentPage;
        this.numOfPages = res.metadata.numberOfPages;
        this.products = res.data;
      },
      error: (err) => console.log(err),
    });
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.numOfPages }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.productSub = this.__ProductService.getProducts().subscribe({
      next: (res) => {
        this.currentPage = res.metadata.currentPage;
        this.numOfPages = res.metadata.numberOfPages;
        this.products = res.data;
      },
      error: (err) => console.log(err),
    });

    this.__WhishlistService.getWishlist().subscribe({
      next: (res) => {
        this.whishlistData = res.data;
        this.whishlistIds = this.whishlistData.map((item) => item._id);
      },
    });
  }

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.catSub?.unsubscribe();
  }
}
