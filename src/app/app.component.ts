declare function require(name: string);

import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
var starwars = require('starwars');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  routerOutlet: any;

  quote: string;

  showQuote: Boolean = true;

  @ViewChild('quotecontainer') quoteContainer;

  constructor() {
    this.quote = starwars();
  }

  toggleNav() {
    this.routerOutlet.toggleNav();
  }

  onActivate(event) {
    this.routerOutlet = event;
  }

  toggleQuote() {
    this.showQuote = !this.showQuote;
    if (this.showQuote)
      this.quote = starwars();
  }

}
