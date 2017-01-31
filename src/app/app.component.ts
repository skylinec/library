import {Component, ViewChild, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  routerOutlet: any;

  toggleNav() {
    this.routerOutlet.toggleNav();
  }

  onActivate(event) {
    this.routerOutlet = event;
  }

}
