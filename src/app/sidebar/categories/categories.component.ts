import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor() {
  }

  categories = [
    {
      "id": 0,
      "name": "Fiction",
      "icon": "none",
      "categories": {}
    },
    {
      "id": 1,
      "name": "Non-Fiction",
      "icon": "none",
      "categories": {}
    }
  ]

  ngOnInit() {
  }

}
