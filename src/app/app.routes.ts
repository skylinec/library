import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {ModuleWithProviders} from "@angular/core";
import {AboutComponent} from "./pages/about/about.component";
import {ViewBookComponent} from "./pages/view-book/view-book.component";
import {NewBookComponent} from "./pages/new-book/new-book.component";
import {NewCategoryComponent} from "./pages/new-category/new-category.component";
import {EditBookComponent} from "./pages/edit-book/edit-book.component";
import {AuthPortComponent} from "./auth-port/auth-port.component";

export const router: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books/:id', component: HomeComponent},
  {path: 'books', component: HomeComponent},
  {path: 'newbook', component: NewBookComponent},
  {path: 'newbook/:id', component: NewBookComponent},
  {path: 'newcategory', component: NewCategoryComponent},
  {path: 'newcategory/:id', component: NewCategoryComponent},
  {path: 'editbook/:id', component: EditBookComponent},
  {path: 'book/:id', component: ViewBookComponent},
  {path: 'about', component: AboutComponent},
  {path: 'auth', component: AuthPortComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router, {useHash: true});
