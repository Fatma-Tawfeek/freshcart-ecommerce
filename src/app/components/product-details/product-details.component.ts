import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

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

  constructor(private __ProductService: ProductsService) {}

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
  }
}
