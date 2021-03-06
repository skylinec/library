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
import {UserService} from "../../user.service";

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
              private notificationsService: NotificationsService,
              private userService: UserService) {
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
      .subscribe((res: Book) => {
        this.router.navigate(['/book', res.id]);
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
        this.router.navigateByUrl('/newbook');
      }
    });

    console.log("Username: " + this.userService.getUserUsername());

    this.newBookForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40)
      ]],
      parent: [this.interstitialId],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300)
      ]],
      summary: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]],
      author: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      tags: [[]],
      owner: [this.userService.getUserUsername(), [
        Validators.required
      ]]
    })
  }
}
