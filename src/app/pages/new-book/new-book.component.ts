import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl} from "@angular/forms";
import {Book} from "../../Book";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {URLSearchParams, Headers, Http, Response} from "@angular/http";
import {BookService} from "../../book.service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  id: string;

  newBookForm: FormGroup;
  title: AbstractControl;
  parent: AbstractControl;
  interstitialId: string;

  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  public options = {
    readonly: undefined,
    placeholder: 'Tags (Press enter for each)'
  };

  value: any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private bookService: BookService,
              private notificationsService: NotificationsService) {
  }

  save(model: any, isValid: boolean) {
    this.submitted = true; // set form submit to true

    this.bookService.createBook(model)
      .subscribe((res: Response) => {
        this.router.navigateByUrl('/books');
        this.notificationsService.info("Book saved", "Book " + model.title + " has been saved.");
      });

    console.log(model, isValid);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Books category ID: ', params['id']);
      if (!(this.route.snapshot.params['id'] == "undefined")) {
        this.interstitialId = params['id'];
      } else {
        this.interstitialId = "";
      }
    });

    this.newBookForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      parent: [this.interstitialId, Validators.required],
      description: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      summary: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      author: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      tags: [[]],
    })
  }
}
