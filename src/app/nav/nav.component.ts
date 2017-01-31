import {Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() toggledNav = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toggleNav() {
    this.toggledNav.emit();
  }

}
