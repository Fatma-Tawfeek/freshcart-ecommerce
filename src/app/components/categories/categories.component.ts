import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories!: ICategory[];
  catSub!: Subscription;
  constructor(private __CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.catSub = this.__CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.catSub.unsubscribe();
  }
}
