import { Component } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/brands';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgClass],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  brandsData!: IBrand[];
  brandSub!: Subscription;
  currentPage!: number;
  numOfPages!: number;

  constructor(private __BrandsService: BrandsService) {}

  getPageByNumber(page: number) {
    this.brandSub = this.__BrandsService.getAllBrands(page).subscribe({
      next: (res) => {
        this.currentPage = res.metadata.currentPage;
        this.numOfPages = res.metadata.numberOfPages;
        this.brandsData = res.data;
      },
      error: (err) => console.log(err),
    });
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.numOfPages }, (_, i) => i + 1);
  }

  ngOnInit(): void {
    this.brandSub = this.__BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data;
        this.currentPage = res.metadata.currentPage;
        this.numOfPages = res.metadata.numberOfPages;
      },
    });
  }
}
