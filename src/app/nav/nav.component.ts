import {Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import {Jsonp, Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  quote: any;
  headers: any;

  @Output() toggledNav = new EventEmitter();

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  ngOnInit() {
    this.quote = this.getQuote();
    console.log(this.quote)
  }

  getQuote() {
    return this.http.request("http://quotes.stormconsultancy.co.uk/random.json", this.headers)
      .map((response: Response) => response.json());
  }

  toggleNav() {
    this.toggledNav.emit();
  }

}
