import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewBookComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    SidebarComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    routes,
    FormsModule,
    JsonpModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
