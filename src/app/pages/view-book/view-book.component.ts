import {Component, OnInit, Input} from '@angular/core';
import {BookService} from "../../book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../Book";
import {CategoryService} from "../../category.service";
import {NotificationsService} from "angular2-notifications";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  book: Book = new Book;
  errorMessage: string;
  id: string;

  currentCategoryName: string = "All";

  categoryTree: Array<any> = [];

  childCategories: Array<Object>;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private notificationsService: NotificationsService) {
  }

  getBook() {
    // this.book.name = this.route.snapshot.params['name'];
    // this.book.description = this.route.snapshot.params['description'];
    // this.book.tags = this.route.snapshot.params['tags'];
    // this.book.author = this.route.snapshot.params['author'];
    // this.book.parent = this.route.snapshot.params['parent'];

    this.id = this.route.snapshot.params['id'];

    console.log("Book id for view-book: " + this.id);
    this.bookService.getBookById(this.id)
      .subscribe(
        (res) => {
          this.book = res;
          console.log("Res received from service: " + res);
          this.buildCategoryTree(res);
        },
        (error) => this.errorMessage = error)
  }

  deleteBook(id: string, parent: string, name: string) {
    this.bookService.deleteBookById(id)
      .subscribe((res) => {

        },
        (error) => {
          console.log("Error deleting book: " + error);
        });
    this.notificationsService.info("Books deleted", "Book " + name + " has been deleted.");
    if (!(parent == undefined)) {
      this.router.navigate(['/books', parent, {cat: this.route.params['cat']}]);
    } else {
      this.router.navigate(['/books']);
    }

  }

  buildCategoryTree(book) {
    this.categoryService.getCategoryById(book.parent)
      .subscribe((category) => {
          this.categoryTree.push(category.name);
          console.log("Got category name " + category.name);
        },
        (error) => this.errorMessage = error);
  }

  navigateToCategory(id: string, name: string) {
    this.router.navigate(['/books', id, {cat: name}]);
  };

  ngOnInit() {
    this.getBook();
  }

}
