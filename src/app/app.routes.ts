import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {ModuleWithProviders} from "@angular/core";

export const router: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
