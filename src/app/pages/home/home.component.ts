import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../book.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('sidebar') sidebar;

  books: any;

  toggleNav() {
    this.sidebar.toggle();
  }

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    // const books = HORIZON("books");
    // this.books = this.bookService.getBooks(books);
  }

}
