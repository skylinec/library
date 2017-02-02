import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../category.service";
import {Category} from "../../Category";
import * as _ from "lodash";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  errorMessage: string;

  foundObj: any;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
    console.log(this.categories)
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(
        category => this.categories = category,
        error => this.errorMessage = <any>error);
  }

}
