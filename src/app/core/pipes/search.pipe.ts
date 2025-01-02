import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(data: any[], searchKey: string): any[] {
    return data.filter((current) => {
      return current.title.toLowerCase().includes(searchKey.toLowerCase());
    });
  }
}
