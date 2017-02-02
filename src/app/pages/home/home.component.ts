import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {BookService} from "../../book.service";
import {Book} from "../../Book";
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from "../../category.service";
import {Category} from "../../Category";
import {router} from "../../app.routes";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('sidebar') sidebar;

  books: any;
  errorMessage: string;
  currentCategory: any;
  currentCategoryName: string = "All";

  id: string;
  sub: any;

  toggleNav() {
    this.sidebar.toggle();
  }

  getBooks() {
    if (this.id == undefined) {
      this.bookService.getBooks()
        .subscribe(
          books => this.books = books,
          error => this.errorMessage = <any>error);

      this.notificationsService.info("Books Loaded", "Books have been loaded from the database.")
    } else {
      this.bookService.getBooksByParentId(this.id.toString())
        .subscribe(
          books => this.books = books,
          error => this.errorMessage = <any>error);

      this.categoryService.getCategoryById(this.id.toString())
        .subscribe(
          (category) => this.currentCategory = category,
          error => this.errorMessage = <any>error);

      console.log("Category got by ID: " + this.currentCategory);

      // this.currentCategoryName = this.currentCategory ? this.currentCategory.name : "Error";

      this.notificationsService.info("Books loaded from category", "Books have been loaded from the database for category id " + this.id);

    }

  }

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      console.log('Books category ID: ', params['id']);
      this.id = params['id'];
      this.currentCategoryName = params['cat'];
    });

    this.getBooks();
  }

  ngOnDestroy() {
  }

}
