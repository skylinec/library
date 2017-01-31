import {Component, OnInit, EventEmitter, Output, ViewChild, Input} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  constructor() {
  }

  ngOnInit() {

  }

  toggle() {
    this.sidenav.toggle();
  }

}
