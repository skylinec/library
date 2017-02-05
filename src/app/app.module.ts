import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Jsonp, ConnectionBackend, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {NewBookComponent} from './pages/new-book/new-book.component';
import {NavComponent} from './nav/nav.component';
import {SidebarComponent} from './sidebar/sidebar/sidebar.component';
import {CategoriesComponent} from './sidebar/categories/categories.component';
import {MaterialModule} from "@angular/material";
import {routes} from "./app.routes";
import 'hammerjs';
import {AboutComponent} from './pages/about/about.component';
import {BookService} from "./book.service";
import {ViewBookComponent} from './pages/view-book/view-book.component';
import {CategoryNamePipe} from './category-name.pipe';
import {CategoryService} from "./category.service";
import {SimpleNotificationsModule} from "angular2-notifications";
import {TagInputModule} from "ng2-tag-input";
import {AutoCompleteModule} from 'primeng/primeng';
import {NewCategoryComponent} from "./pages/new-category/new-category.component";
import {EditBookComponent} from "./pages/edit-book/edit-book.component";
import {StormpathModule} from "angular-stormpath";
import {AuthBoxComponent} from './auth-box/auth-box.component';
import {AuthPortComponent} from './auth-port/auth-port.component';
import {UserService} from "./user.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewBookComponent,
    NewCategoryComponent,
    NavComponent,
    SidebarComponent,
    CategoriesComponent,
    AboutComponent,
    ViewBookComponent,
    EditBookComponent,
    CategoryNamePipe,
    AuthBoxComponent,
    AuthPortComponent,
  ],
  imports: [
    BrowserModule,
    SimpleNotificationsModule,
    routes,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    HttpModule,
    MaterialModule.forRoot(),
    TagInputModule,
    AutoCompleteModule,
    StormpathModule
  ],
  providers: [BookService, CategoryService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
