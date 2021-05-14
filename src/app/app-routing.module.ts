import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./acount/acount.module').then(m => m.AcountModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {path: '', component: HomeComponent},
  {
    path: 'home', redirectTo: '', pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./produc-home/produc-home.module').then(m => m.ProducHomeModule)
  }
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
