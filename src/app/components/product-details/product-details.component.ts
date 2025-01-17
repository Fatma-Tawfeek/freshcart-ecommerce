import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../../core/services/whishlist.service';
import { IWishlist } from '../../core/interfaces/whishlist';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  private readonly __ActivatedRoute = inject(ActivatedRoute);
  productId!: string | null;
  productDetails: IProduct | null = null;
  whishlistData!: IWishlist[];
  whishlistIds!: string[];

  constructor(
    private __ProductService: ProductsService,
    private __CarteService: CartService,
    private __ToastrService: ToastrService,
    private __WhishlistService: WhishlistService
  ) {}

  addCartItem(p_id: string) {
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
  ngOnInit(): void {
    this.__ActivatedRoute.paramMap.subscribe({
      next: (pInfo) => {
        this.productId = pInfo.get('p_id');
      },
    });

    this.__ProductService.getProductDetails(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
    });

    this.__WhishlistService.getWishlist().subscribe({
      next: (res) => {
        this.whishlistData = res.data;
        this.whishlistIds = this.whishlistData.map((item) => item._id);
      },
    });
  }
}
