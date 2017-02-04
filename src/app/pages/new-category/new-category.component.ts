import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, AbstractControl} from "@angular/forms";
import {Book} from "../../Book";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {URLSearchParams, Headers, Http, Response} from "@angular/http";
import {BookService} from "../../book.service";
import {NotificationsService} from "angular2-notifications";
import {CategoryService} from "../../category.service";
import {Category} from "../../Category";

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  id: string;

  newCategoryForm: FormGroup;
  title: AbstractControl;
  parent: AbstractControl;
  interstitialId: string;
  interstitialName: string;
  namedObject: Category;

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
              private categoryService: CategoryService,
              private notificationsService: NotificationsService) {
  }

  public clone(): any {
    var cloneObj = new (<any>this.constructor)(); // line fixed
    for (var attribut in this) {
      if (typeof this[attribut] === "object") {
        cloneObj[attribut] = this.clone();
      } else {
        cloneObj[attribut] = this[attribut];
      }
    }
    return cloneObj;
  }

  save(model: any, isValid: boolean) {
    // var regex = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
    //
    // this.submitted = true; // set form submit to true
    //
    // this.categoryService.getCategoryByName(model.parent)
    //   .subscribe((dad:Category) => {
    //     console.log("First category object " + dad);
    //     this.namedObject = dad;
    //   });
    //
    // this.categoryService.getCategoryById(this.namedObject.parent)
    //   .subscribe((masterRes:Category) => {
    //     this.namedObject = masterRes
    //   });
    //
    // if (regex.test(this.namedObject.id)) {
    //   this.bookService.createBook(model)
    //     .subscribe((res: Response) => {
    //       // this.router.navigateByUrl('/books');
    //       this.notificationsService.info("Book saved", "Book " + model.title + " has been saved.");
    //     });
    // } else {
    //   var modelTemp = model.clone();
    //
    //   modelTemp.parent = this.namedObject.id;
    //
    //   this.bookService.createBook(modelTemp)
    //     .subscribe((res: Response) => {
    //       // this.router.navigateByUrl('/books');
    //       this.notificationsService.info("Book saved", "Book " + model.title + " has been saved.");
    //     });

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
        this.interstitialName = params['categoryname'];
      } else {
        this.interstitialId = "";
      }
    });

    this.newCategoryForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      parent: [this.interstitialId, Validators.required],
      tags: [[]],
    })
  }
}
