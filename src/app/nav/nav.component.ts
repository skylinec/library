import {Component, OnInit, ViewChild, EventEmitter, Output, OnChanges} from '@angular/core';
import {Jsonp, Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {Router, ActivatedRoute} from "@angular/router";
import {BookService} from "../book.service";
import {Book} from "../Book";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {

  quote: any;
  headers: any;

  myUrl: string;

  doc = document;

  @Output() toggledNav = new EventEmitter();

  constructor(private http: Http, private router: Router, private bookService: BookService, private route: ActivatedRoute) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  text: string;

  bookNames: Array<string> = [];

  results: Book[];

  val: Book;

  test = '/books';

  search(event) {
    this.bookService.getBooks()
      .subscribe(books => {
        this.results = this.filterBook(event, books);
      });
  }

  filterBook(query, books: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      if (book.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(book);
      }
    }
    return filtered;
  }

  ngOnInit() {
    this.quote = this.getQuote();
    console.log(this.quote)
  }

  ngOnChanges() {
    console.log(this.router.url);
  }

  getQuote() {
    return this.http.request("http://quotes.stormconsultancy.co.uk/random.json", this.headers)
      .map((response: Response) => response.json());
  }

  toggleNav() {
    this.toggledNav.emit();
  }

}
