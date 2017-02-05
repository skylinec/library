import {Injectable, OnInit, Inject} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Category} from "./Category";
import {map} from "rxjs/operator/map";
import {UserService} from "./user.service";

@Injectable()
export class CategoryService {

  categoriesUrl = "http://localhost:2403/categories";

  constructor(private _http: Http, private userService: UserService) {
    console.log("Username: " + this.userService.getUserUsername());
  }

  getCategories(): Observable<Category[]> {
    return this._http.get(this.categoriesUrl + "?owner=" + this.userService.getUserUsername())
      .map((res: Response) => res.json());
  }

  getCategoriesByParentId(id: string): Observable<Category[]> {
    return this._http.get(this.categoriesUrl + "?parent=" + id + "&owner=" + this.userService.getUserUsername())
      .map((res: Response) => res.json());
  }

  getCategoryById(id: string): Observable<any> {
    return this._http.get(this.categoriesUrl + "?id=" + id)
      .map((res: Response) => res.json());
  }

  getCategoryByName(name: string): Observable<any> {
    return this._http.get(this.categoriesUrl + "?name=" + name)
      .map((res: Response) => res.json());
  }

  createCategory(value): Observable<any> {
    return this._http.post(this.categoriesUrl, value)
      .map((res: Response) => res.json());
  }

  // getBooks() {
  //   return dpd.books.get(function(result, error) {
  //     return result
  //   });
  // }

}
