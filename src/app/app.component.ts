import {Component, ViewChild, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('sidebar') sidebar;

  toggleNav() {
    this.sidebar.toggle();
  }

}
