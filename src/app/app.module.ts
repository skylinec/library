import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Jsonp, ConnectionBackend, JsonpModule} from '@angular/http';

import { AppComponent } from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {NewBookComponent} from './pages/new-book/new-book.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {RegisterComponent} from './pages/auth/register/register.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewBookComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    SidebarComponent,
    CategoriesComponent,
    AboutComponent,
    ViewBookComponent,
    CategoryNamePipe,
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
    TagInputModule
  ],
  providers: [BookService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
