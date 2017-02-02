import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {ModuleWithProviders} from "@angular/core";
import {AboutComponent} from "./pages/about/about.component";
import {ViewBookComponent} from "./pages/view-book/view-book.component";
import {NewBookComponent} from "./pages/new-book/new-book.component";

export const router: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books/:id', component: HomeComponent},
  {path: 'books', component: HomeComponent},
  {path: 'newbook', component: NewBookComponent},
  {path: 'newbook/:id', component: NewBookComponent},
  {path: 'book/:id', component: ViewBookComponent},
  {path: 'about', component: AboutComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
