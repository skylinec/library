import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../category.service";
import {Category} from "../../Category";
import * as _ from "lodash";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  errorMessage: string;

  foundObj: any;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getCategories();
    console.log(this.categories)
  }

  getCategoriesByParentId(id: string): Category[] {
    if (!(id == undefined)) {
      this.categoryService.getCategoriesByParentId(id)
        .subscribe(
          categories => {
            return categories;
          },
          error => this.errorMessage = <any>error);
    } else {
      return []
    }
  }

  navigateToCategory(id: string, name: string) {
    this.router.navigate(['/loading']);
    setTimeout(() => {
      this.router.navigate(['/books', id, {cat: name}]);
    }, 250);
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(
        categories => this.categories = categories,
        error => this.errorMessage = <any>error);
  }

}
