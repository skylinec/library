import {Pipe, PipeTransform} from '@angular/core';
import {CategoryService} from "./category.service";
import {Category} from "./Category";
import * as _ from 'lodash';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {

  category: Category;

  errorMessage: string;

  categoryName: string;

  constructor(private categoryService: CategoryService) {

  }

  transform(value: any, args?: any): any {
    this.categoryService.getCategoryById(value)
      .subscribe(
        category => this.category = category,
        error => this.errorMessage = <any>error);

    this.categoryName = this.category.name;

    console.log("Category name is " + this.categoryName);
    return this.categoryName;
  }

}
