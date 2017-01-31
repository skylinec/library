declare function require(name: string);

import {Component, ViewChild, Output, EventEmitter, OnChanges} from '@angular/core';
var starwars = require('starwars');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {

  routerOutlet: any;

  quote: string;

  showQuote: Boolean = true;

  bookCount: number;

  categoryCount: number;

  error: string;

  quoteClicked: Boolean = false;

  showError: Boolean = false;

  @ViewChild('quotecontainer') quoteContainer;

  errors: Array<string>;

  constructor() {
    this.errors = [
      "An error has occurred getting collection statistics or you have not started using Library App yet.",
      "An error has occurred querying your collection.",
      "You have not added any books yet",
      ""
    ];

    this.quoteClicked = false;

    this.quote = starwars();

    this.categoryCount = 0;
    this.bookCount = 0;

    if (this.categoryCount == 0 && this.bookCount == 0) {
      this.error = this.errors[0];
    } else if (this.bookCount == 0) {
      this.error = this.errors[2];
    }

  }

  ngOnChanges() {

  }

  toggleNav() {
    this.routerOutlet.toggleNav();
  }

  onActivate(event) {
    this.routerOutlet = event;
  }

  toggleQuote() {
    console.log("[error state] " + this.error);
    console.log("[quote clicked] " + this.quoteClicked);
    console.log("[show quote] " + this.showQuote);
    this.quoteClicked = true;

    if (this.error) {
      this.showQuote = false;
      return false;
    }

    this.showQuote = !this.showQuote;

    if (this.showQuote == true) {
      this.quote = starwars();
    }
  }


}
