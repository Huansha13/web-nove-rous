import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListProductComponent} from './page/list-product/list-product.component';
import {NavComponent} from './page/nav/nav.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {ProductEditComponent} from './page/product-edit/product-edit.component';
import {DetailsComponent} from './components/details/details.component';

const routes: Routes = [
  {
    path: '', component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'list', component: ListProductComponent},
      {path: '', redirectTo: 'list'},
      {path: 'edit', component: ProductEditComponent},

      {path: 'details/:id', component: DetailsComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
