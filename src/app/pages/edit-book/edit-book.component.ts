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
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  id: string;

  editBookForm: FormGroup;
  title: FormControl = new FormControl("");
  parent: FormControl = new FormControl("");
  description: FormControl = new FormControl("");
  summary: FormControl = new FormControl("");
  author: FormControl = new FormControl("");
  tags: FormControl = new FormControl([]);
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

  currentUser: string;
  bookOwner: string;

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

    model.id = this.route.snapshot.params['bookId'];

    this.bookService.editBook(model)
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
      }
    });

    console.log("Username: " + this.userService.getUserUsername());

    this.editBookForm = this.fb.group({
      title: [this.title.value, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40)
      ]],
      parent: [this.interstitialId],
      description: [this.description, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300)
      ]],
      summary: [this.summary, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]],
      author: [this.author, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)
      ]],
      tags: [[]],
      owner: [this.userService.getUserUsername(), [
        Validators.required
      ]]
    });

    this.bookService.getBookById(this.route.snapshot.params['bookId'])
      .subscribe((res) => {
        this.editBookForm.patchValue({
          title: res.title,
          parent: res.parent,
          description: res.description,
          summary: res.summary,
          author: res.author,
          tags: res.tags,
        });

        console.log("Editing book of title: " + res.title);
        console.log("Editing book of parent: " + res.parent);
        console.log("Editing book of description: " + res.description);
        console.log("Editing book of summary: " + res.summary);
        console.log("Editing book of author: " + res.author);
        console.log("Editing book of tags: " + res.tags);

        this.bookOwner = res.owner;
      });

    this.currentUser = this.userService.getUserUsername();
  }
}
