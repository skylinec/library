import {Injectable, OnInit, Inject} from '@angular/core';

@Injectable()
export class BookService {

  books: any;

  constructor() {
  }

  getBooks(books) {
    return books.fetch().subscribe(
      (books) => {
        books.map((book) => {
          book.json()
        })
      },
      (err) => {
        console.log(err)
      })
  }

}
