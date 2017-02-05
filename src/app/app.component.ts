import {Book} from "./Book";
declare function require(name: string);

import {Component, ViewChild, Output, EventEmitter, OnChanges, OnInit} from '@angular/core';
import {BookService} from "./book.service";
import {CategoryService} from "./category.service";
import {Category} from "./Category";
import {forEach} from "@angular/router/src/utils/collection";
import {NotificationsService} from "angular2-notifications";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Account, Stormpath} from "angular-stormpath";
var starwars = require('starwars');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {

  routerOutlet: any;

  quote: string;

  showQuote: Boolean = true;

  bookCount: number = 0;

  categoryCount: number = 0;

  error: string;

  books: Book[];

  categories: Category[];

  errorMessage: string;

  quoteClicked: Boolean = false;

  showError: Boolean = false;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  };

  @ViewChild('quotecontainer') quoteContainer;

  errors: Array<string>;

  public user$: Observable<Account | boolean>;
  public loggedIn$: Observable<boolean>;
  public login: boolean;
  public register: boolean;

  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private notificationsService: NotificationsService,
              private router: Router,
              private route: ActivatedRoute,
              public stormpath: Stormpath) {
    this.errors = [
      "An error has occurred getting collection statistics or you have not started using Library App yet.",
      "An error has occurred querying your collection.",
      "You have not added any books yet",
      ""
    ];

    this.quoteClicked = false;

    this.quote = starwars();

  }

  ngOnChanges() {

  }

  ngOnInit() {
    this.getBooks();
    this.getCategories();
  }

  toggleNav() {
    this.routerOutlet.toggleNav();
  }

  onActivate(event) {
    console.log("ACTIVATED ROUTE IS " + this.route.outlet);
    this.routerOutlet = event;
  }

  getBooks() {
    this.bookService.getBooks()
      .subscribe(
        (books) => {
          this.books = books;
          for (let i in this.books) {
            this.bookCount = this.bookCount + 1;
            console.log("Book counted " + i)
          }
        },
        error => this.errorMessage = <any>error);
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(
        (categories) => {
          this.categories = categories;
          for (let i in this.categories) {
            this.categoryCount = this.categoryCount + 1;
            console.log("Category counted " + i)
          }
        },
        error => this.errorMessage = <any>error);
  }

  // getBooks() {
  //   this.books = this.bookService.getBooks()
  // }

  toggleQuote() {
    console.log("[error state] " + this.error);
    console.log("[quote clicked] " + this.quoteClicked);
    console.log("[show quote] " + this.showQuote);
    console.log("[book count] " + this.bookCount);
    console.log("[category count] " + this.categoryCount);
    this.quoteClicked = true;

    if (this.error) {
      this.showQuote = false;
      return false;
    }

    if (this.categoryCount == 0 && this.bookCount == 0) {
      this.error = this.errors[0];
    } else if (this.bookCount == 0) {
      this.error = this.errors[2];
    }

    this.showQuote = !this.showQuote;

    if (this.showQuote == true) {
      this.quote = starwars();
    }


  }


}
