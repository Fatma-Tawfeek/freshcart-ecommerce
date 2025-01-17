import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../../core/services/whishlist.service';
import { IWishlist } from '../../core/interfaces/whishlist';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, UpperCasePipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  products!: IProduct[];
  categories!: ICategory[];
  productSub!: Subscription;
  catSub!: Subscription;
  searchInput: string = '';
  whishlistData!: IWishlist[];
  whishlistIds!: string[];

  private readonly __ProductService = inject(ProductsService);
  private readonly __CategoriesService = inject(CategoriesService);
  private readonly __CarteService = inject(CartService);
  private readonly __ToastrService = inject(ToastrService);
  private readonly __WhishlistService = inject(WhishlistService);
  private readonly __NgxSpinnerService = inject(NgxSpinnerService);

  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    margin: 10,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

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

  ngOnInit(): void {
    this.productSub = this.__ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data.slice(0, 18);
      },
      error: (err) => console.log(err),
    });

    this.catSub = this.__CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
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
