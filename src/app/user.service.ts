import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  errorMessage: string;
  username: string;

  constructor(private _http: Http) {
  }

  getUser(): Observable<any> {
    return this._http.get("http://localhost:4200/me")
      .map((res) => res.json());
  }

  getUserUsername() {
    this.getUser()
      .subscribe((res) => {
          console.log(res);
          console.log(res.account.username);
          this.username = res.account.username;
        },
        (error) => this.errorMessage = error);

    return this.username;
  }
}
