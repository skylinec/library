import {Injectable, OnInit, Inject} from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';
import {Book} from "./Book";
import {Account, Stormpath} from "angular-stormpath";
import {UserService} from "./user.service";

@Injectable()
export class BookService {

  booksUrl = "http://localhost:2403/books";

  private user$: Observable<Account | boolean>;
  private user: Observable<Account>;
  private loggedIn$: Observable<boolean>;
  private login: boolean;
  private register: boolean;
  private userId: string;

  constructor(private _http: Http, public stormpath: Stormpath, private userService: UserService) {
    this.login = true;
    this.register = false;
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);

    console.log("Username: " + this.userService.getUserUsername());
  }

  getBooks(): Observable<Book[]> {
    console.log("USER OBJECT: " + this.user);
    return this._http.get(this.booksUrl + "?owner=" + this.userService.getUserUsername())
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
    return this._http.get(this.booksUrl + "?id=" + id + "&owner=" + this.userService.getUserUsername())
      .map((res: Response) => res.json());
  }

  deleteBookById(id: string) {
    console.log("Running get book by ID on " + id);
    return this._http.delete(this.booksUrl + "?id=" + id)
      .map((res: Response) => res.json());
  }

  getBooksByParentId(id: string): Observable<Book[]> {
    return this._http.get(this.booksUrl + "?parent=" + id + "&owner=" + this.userService.getUserUsername())
      .map((res: Response) => res.json());
  }

  createBook(value): Observable<any> {
    return this._http.post(this.booksUrl, value)
      .map((res: Response) => res.json());
  }

  editBook(value): Observable<any> {
    return this._http.put(this.booksUrl, value)
      .map((res: Response) => res.json());
  }

  // getBooks() {
  //   return dpd.books.get(function(result, error) {
  //     return result
  //   });
  // }

}
