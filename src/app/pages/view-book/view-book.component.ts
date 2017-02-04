import {Component, OnInit, Input} from '@angular/core';
import {BookService} from "../../book.service";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../../Book";

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  book: Book = new Book;
  errorMessage: string;
  id: string;

  constructor(private bookService: BookService, private route: ActivatedRoute) {
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
          console.log("Res received from service: " + res)
        },
        (error) => this.errorMessage = error)
  }

  ngOnInit() {
    this.getBook();
  }

}
