import {Injectable, OnInit, Inject} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {Book} from "./Book";

@Injectable()
export class BookService {

  booksUrl = "http://localhost:2403/books";

  constructor(private _http: Http) {
  }

  getBooks(): Observable<Book[]> {
    return this._http.get(this.booksUrl)
      .map((res: Response) => res.json());
  }

  getBooksPromise() {
    return this._http.get(this.booksUrl)
      .toPromise()
      .then(res => <any[]> res.json().data)
      .then(data => {
        return data;
      });
  }

  getBookById(id: string) {
    console.log("Running get book by ID on " + id);
    return this._http.get(this.booksUrl + "?id=" + id)
      .map((res: Response) => res.json());
  }

  getBooksByParentId(id: string): Observable<Book[]> {
    return this._http.get(this.booksUrl + "?parent=" + id)
      .map((res: Response) => res.json());
  }

  createBook(value): Observable<any> {
    return this._http.post(this.booksUrl, value)
      .map((res: Response) => res.json());
  }

  // getBooks() {
  //   return dpd.books.get(function(result, error) {
  //     return result
  //   });
  // }

}
