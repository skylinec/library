import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Stormpath, Account} from "angular-stormpath";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-box',
  templateUrl: './auth-box.component.html',
  styleUrls: ['./auth-box.component.css']
})
export class AuthBoxComponent implements OnInit {

  private user$: Observable<Account | boolean>;
  private loggedIn$: Observable<boolean>;
  private login: boolean;
  private register: boolean;

  constructor(public stormpath: Stormpath, private router: Router) {
  }

  ngOnInit() {
    this.login = true;
    this.register = false;
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
  }

  showLogin() {
    this.login = !(this.register = false);
  }

  showRegister() {
    this.register = !(this.login = false);
  }

  logout() {
    this.stormpath.logout();
    this.router.navigate(['/auth']);
  }

}
