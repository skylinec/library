import {Component, OnInit, ViewChild, OnDestroy, OnChanges, ElementRef, Renderer} from '@angular/core';
import {BookService} from "../../book.service";
import {Book} from "../../Book";
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from "../../category.service";
import {Category} from "../../Category";
import {router} from "../../app.routes";
import {NotificationsService} from "angular2-notifications";
import {Observable} from "rxjs";
import {Account, Stormpath} from "angular-stormpath";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('sidebar') sidebar;

  books: Book[];
  errorMessage: string;
  currentCategory: any;
  currentCategoryName: string = "All";

  categoryTree: Array<any> = [];

  childCategories: Array<Object>;

  id: string;
  sub: any;

  public user$: Observable<Account | boolean>;
  public loggedIn$: Observable<boolean>;
  public login: boolean;
  public register: boolean;

  toggleNav() {
    this.sidebar.toggle();
  }

  getBooks() {
    if (this.id == undefined) {
      this.bookService.getBooks()
        .subscribe(
          books => {
            this.books = books;
            console.log("Books: " + this.books);
            this.buildCategoryTree(books);
          },
          error => this.errorMessage = <any>error);

      // this.notificationsService.info("Books Loaded", "Books have been loaded from the database.")
    } else {
      this.bookService.getBooksByParentId(this.id.toString())
        .subscribe(
          books => {
            this.books = books;
            console.log("Books: " + this.books);
            this.buildCategoryTree(books);
          },
          error => this.errorMessage = <any>error);

      this.categoryService.getCategoryById(this.id.toString())
        .subscribe(
          (category) => this.currentCategory = category,
          error => this.errorMessage = <any>error);

      console.log("Category got by ID: " + this.currentCategory);

      // this.currentCategoryName = this.currentCategory ? this.currentCategory.name : "Error";

      // this.notificationsService.info("Books loaded from category", "Books have been loaded from the database for category " + this.currentCategoryName);
    }
  }

  getCategoriesByParentId(id: string) {
    if (!(id == undefined)) {
      this.categoryService.getCategoriesByParentId(id)
        .subscribe(
          categories => this.childCategories = categories,
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

  navigateToViewBook(book) {
    this.router.navigate(['/book', book.id]);
  }

  buildCategoryTree(books) {
    this.categoryTree = [];
    if (this.id == undefined) {
      let i = 0;
      for (let book of books) {
        this.categoryService.getCategoryById(book.parent)
          .subscribe((category) => {
              i++;
              this.categoryTree.push(category.name);
              console.log("Got category name " + category.name + " for " + i.toString());
            },
            (error) => this.errorMessage = error);
      }
    } else {
      let i = 0;
      for (let book of books) {
        this.categoryTree.push(this.currentCategoryName);
        i++
      }
    }
  }

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private notificationsService: NotificationsService,
              private router: Router,
              private ref: ElementRef,
              private renderer: Renderer,
              public stormpath: Stormpath) {
  }

  showLogin() {
    this.login = !(this.register = false);
  }

  showRegister() {
    this.register = !(this.login = false);
  }

  ngOnInit() {

    this.getCategoriesByParentId(this.route.snapshot.params['id']);

    console.log("Child categories: " + this.childCategories);

    this.route.params.subscribe(params => {
      console.log('Books category ID: ', params['id']);
      this.id = params['id'];
      this.currentCategoryName = params['cat'];
    });

    this.getBooks();

    this.login = true;
    this.register = false;
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }

  ngOnChanges() {
  }

  ngOnDestroy() {
  }

}
