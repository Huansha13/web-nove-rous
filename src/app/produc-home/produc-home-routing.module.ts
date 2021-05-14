import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetailsProductComponent} from './page/details-product/details-product.component';

const routes: Routes = [
  {
    path: 'info/:id', component: DetailsProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducHomeRoutingModule { }
